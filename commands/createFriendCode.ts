/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { ApplicationCommandInputType, ApplicationCommandOptionType, findOption, sendBotMessage } from "@api/Commands";
import { sendMessage } from "@utils/discord";
import { Command } from "@vencord/discord-types";

import { Errors, logger } from "../modules/utils";
import { InviteModule } from "../modules/webpack";

export default {
    name: "create-friend-code",
    description: "Create a friend code",
    inputType: ApplicationCommandInputType.BUILT_IN,
    options: [
        {
            name: "ephemeral",
            description: "Whether only you can see the message",
            type: ApplicationCommandOptionType.BOOLEAN,
            required: false
        }
    ],
    async execute(args, { channel }) {
        try {
            const invite = await InviteModule.createFriendInvite();
            const content = [
                `Max Uses: ${invite.max_uses}`,
                `Expires: <t:${Math.floor(new Date(invite.expires_at!).getTime() / 1000)}:R>`,
                `https://discord.gg/${invite.code}`
            ].join("\n");

            if (findOption(args, "ephemeral", true)) sendBotMessage(channel.id, { content });
            else sendMessage(channel.id, { content });
        } catch (err) {
            logger.error("Failed to create a friend code", err);
            sendBotMessage(channel.id, { content: Errors.create });
        }
    }
} satisfies Command;
