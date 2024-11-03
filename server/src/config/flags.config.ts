type ProjectFlags = {
    newUI: boolean;
    betaFeatures: boolean;
};

type EnvFlags = {
    [project: string]: ProjectFlags;
};

type FlagsConfig = {
    [env in 'development' | 'production']: EnvFlags;
};

export const flagsConfig: FlagsConfig = {
    development: {
        projectA: {
            newUI: true,
            betaFeatures: false,
        },
        projectB: {
            newUI: false,
            betaFeatures: false,
        },
    },
    production: {
        projectA: {
            newUI: false,
            betaFeatures: true,
        },
        projectB: {
            newUI: true,
            betaFeatures: true,
        },
    }
};
