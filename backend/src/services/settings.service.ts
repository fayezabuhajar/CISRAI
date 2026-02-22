import Settings, {
  IVenueSettings,
  IImportantDate,
  ISponsor,
} from "../models/Settings";

export const settingsService = {
  async getSettings() {
    const settings = await (Settings as any).getSettings();
    return settings;
  },

  async updateVenue(venueData: Partial<IVenueSettings>) {
    const settings = await (Settings as any).getSettings();

    // Update only provided fields
    Object.keys(venueData).forEach((key) => {
      if (venueData[key as keyof IVenueSettings] !== undefined) {
        settings.venue[key] = venueData[key as keyof IVenueSettings];
      }
    });

    await settings.save();
    return settings;
  },

  async getVenue() {
    const settings = await (Settings as any).getSettings();
    return settings.venue;
  },

  async getImportantDates() {
    const settings = await (Settings as any).getSettings();
    return settings.importantDates;
  },

  async updateImportantDates(dates: IImportantDate[]) {
    const settings = await (Settings as any).getSettings();
    settings.importantDates = dates;
    await settings.save();
    return settings.importantDates;
  },

  async getPatronName() {
    const settings = await (Settings as any).getSettings();
    return {
      patronNameEn: settings.patronNameEn,
      patronNameAr: settings.patronNameAr,
    };
  },

  async updatePatronName(patronData: {
    patronNameEn?: string;
    patronNameAr?: string;
  }) {
    const settings = await (Settings as any).getSettings();

    if (patronData.patronNameEn !== undefined) {
      settings.patronNameEn = patronData.patronNameEn;
    }
    if (patronData.patronNameAr !== undefined) {
      settings.patronNameAr = patronData.patronNameAr;
    }

    await settings.save();
    return {
      patronNameEn: settings.patronNameEn,
      patronNameAr: settings.patronNameAr,
    };
  },

  async getSponsors() {
    const settings = await (Settings as any).getSettings();
    return settings.sponsors;
  },

  async updateSponsors(sponsors: ISponsor[]) {
    const settings = await (Settings as any).getSettings();
    settings.sponsors = sponsors;
    await settings.save();
    return settings.sponsors;
  },
};
