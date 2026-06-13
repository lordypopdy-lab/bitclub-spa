// Provider switch. Replace with MongoReferralRepository later — UI stays unchanged.
import { LocalStorageReferralRepository, getTier } from "./LocalStorageReferralRepository.js";

export const ReferralRepository = LocalStorageReferralRepository;
export { getTier };
