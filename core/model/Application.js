class Application {
    constructor(
        id,
        name,
        summary,
        description,
        developer,
        license,
        homepage,
        bugtrackerUrl,
        donationUrl,
        icon,
        downloadUrl,
        version,
        lastReleaseDate,
        creationDate,
        tags,
        screenshots,
        store,
        packageType,
        packageName,
        confinement,
        viewCount,
    ) {
        this.id = id;
        this.name = name;
        this.summary = summary;
        this.description = description;
        this.developer = developer;
        this.license = license;
        this.homepage = homepage;
        this.bugtrackerUrl = bugtrackerUrl;
        this.donationUrl = donationUrl;
        this.icon = icon;
        this.downloadUrl = downloadUrl;
        this.version = version;
        this.lastReleaseDate = lastReleaseDate;
        this.creationDate = creationDate;
        this.tags = tags;
        this.screenshots = screenshots;
        this.store = store;
        this.packageType = packageType;
        this.packageName = packageName;
        this.confinement = confinement;
        this.viewCount = viewCount;
    }
}

module.exports = {
    Application,
};
