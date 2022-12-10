const CronJob = require('cron').CronJob;

async function main(){
    process.send({})
    const job = new CronJob( '* * * * *', () => process.send({}), null, true);
    job.start()
}

main()