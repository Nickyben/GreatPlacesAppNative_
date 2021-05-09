const envVars = {
    development:{
       // googleApiKey: //check pc docs////
    },
    production:{
        //check pc docs///
    }
};

const getEnvVars = () =>{
    if(__DEV__){
        return envVars.development;
    }
    return envVars.production;
};

export default getEnvVars;