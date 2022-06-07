
module.exports = {
    deploy: {
        start: async function ({ arc, cloudformation, dryRun, inventory, stage }) {
            //cloudformation.Resources.csfsAnyCatchallHTTPLambda = cloudformation.Resources.AnyCatchallHTTPLambda
            print(cloudformation.Resources)
            return cloudformation
        }
    }
}