/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { Logger } from "@utils/Logger";

export const logger = new Logger("FriendCodes");

export const Errors = {
    create: "Couldn't create a friend code. Please try again later.",
    revoke: "Couldn't revoke your friend codes. Please try again later."
};
