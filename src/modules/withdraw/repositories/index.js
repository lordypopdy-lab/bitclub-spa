// Repository provider. Swap implementations here to migrate to MongoDB.
// e.g. export const WithdrawalRepository = MongoWithdrawalRepository;
import { LocalStorageWithdrawalRepository } from "./LocalStorageWithdrawalRepository.js";
import { LocalStorageBalanceRepository } from "./LocalStorageBalanceRepository.js";
import { LocalStorageNotificationRepository } from "./LocalStorageNotificationRepository.js";

export const WithdrawalRepository = LocalStorageWithdrawalRepository;
export const BalanceRepository = LocalStorageBalanceRepository;
export const NotificationRepository = LocalStorageNotificationRepository;
