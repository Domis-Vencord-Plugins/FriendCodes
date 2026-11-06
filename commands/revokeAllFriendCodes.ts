/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { ApplicationCommandInputType, sendBotMessage } from "@api/Commands";
import { Command } from "@vencord/discord-types";

import { Errors, logger } from "../modules/utils";
import { InviteModule } from "../modules/webpack";

export default {
    name: "revoke-all-friend-codes",
    description: "Revoke all your friend codes",
    inputType: ApplicationCommandInputType.BUILT_IN,
    async execute(_, { channel }) {
        try {
            const { length } = await InviteModule.getAllFriendInvites();
            await InviteModule.revokeFriendInvites();
            sendBotMessage(channel.id, { content: `Revoked ${length} friend code${length === 1 ? "" : "s"}.` });
        } catch (err) {
            logger.error("Failed to revoke friend codes", err);
            sendBotMessage(channel.id, { content: Errors.revoke });
        }
    }
} satisfies Command;
