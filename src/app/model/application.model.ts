export interface Application {
    id: string;
    name: string;
    summary: string;
    description: string;
    developer: string;
    license: string;
    homepage: string;
    bugtrackerUrl: string;
    donationUrl: string;
    icon: string;
    downloadUrl: string;
    version: string;
    lastReleaseDate: Date;
    creationDate: Date;
    tags: string[];
    screenshots: string[];
    store: string;
    packageType: string;
    packageName: string;
    confinement: string;
}
