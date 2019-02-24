const bunyan = require('bunyan');
const ipfsClient = require('ipfs-http-client');
const lodash = require('lodash');
const cloudflare = require('cloudflare')({
  key: process.env.CF_API_KEY,
  email: process.env.CF_EMAIL
});

const log = bunyan.createLogger({ name: 'ipfs_deploy', level: bunyan.TRACE });

/**
 * Publishes the ipfsHash under ipns
 * NOTE: doesn't work with a infura gate node
 * Will use this if eventually need to setup ipfs node
 * 
 * @param {ipfsClient} ipfs
 * @param {string} ipfsHash 
 * @returns {Promise<string>} ipnsHash
 */
const publishHash = lodash.curry((ipfs, ipfsHash) => {
  log.info('Publishing ipfs hash [%s] to ipns...', ipfsHash)
  return ipfs.name.publish(ipfsHash)
    .then(({ name, value }) => {
      log.info({ name, value }, 'Completed publishing to ipfns')
      return name;
    })
});

/**
 *  Updates TXT Record.
 *
 * @param {string} ipnsHash
 * @returns {void}
 */
function updateTXTRecord(ipnsHash) {
  log.info('Updating txt record to: %s.', ipnsHash);
  const zoneId = process.env.CF_ZONE_ID;
  const dnsRecordId = process.env.CF_DNS_RECORD_ID;

  return cloudflare.dnsRecords.read(zoneId, dnsRecordId)
    .then(record => {
      return record.result;
    })
    .then(dnsRecord => {
      return cloudflare.dnsRecords.edit(zoneId, dnsRecordId, Object.assign({}, dnsRecord, {
        content: `dnslink=${ipnsHash}`
      }))
  }).then(recordInfo => {
    log.info({ record: recordInfo }, 'Updated DNS Record info');
    return recordInfo
  })
  .catch(err => {
    log.error(err, 'Error updating dns');
    return err
  });
}

function main() {
  log.info('Intialize IPFS client to Daemon Server.');
  const ipfs = ipfsClient('ipfs.infura.io', '5001', { protocol: 'https' });
  const websiteCodePath = '../';

  log.info('Adding files in path: %s to logs.', websiteCodePath);
  ipfs.addFromFs(websiteCodePath, { recursive: true, ignore: ['.deploy_scripts/**'] })
    .then(result => {
      log.debug({ result }, 'ipfs.addFromFs results')
      const folderInfo = result[result.length - 1];
      log.info({ folder: folderInfo }, 'Uploaded folder info.');
      const ipfsHash = `/ipfs/${folderInfo.hash}`;
      return ipfsHash;
    })
    .catch(err => {
      log.error(err, 'Error adding files to website.')
      return err;
    })
    // .then(publishHash(ipfs))
    .then(updateTXTRecord)
    .then(() => {
      log.info('Successully update website');
    })
    .catch(err => {
      log.error(err, 'Updating Website failed')
      process.exit(-1);
    })
}

main();