/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import "./FriendCodeRow.css";

import { Flex } from "@components/Flex";
import { Text } from "@components/Text";
import { copyToClipboard } from "@utils/clipboard";
import { classNameFactory } from "@utils/css";
import { FriendInvite } from "@vencord/discord-types";
import { Parser } from "@webpack/common";

import CopyButton from "./CopyButton";

const cl = classNameFactory("vc-friend-codes-");

interface FriendCodeRowProps {
    invite: FriendInvite;
}

export default function FriendCodeRow({ invite }: FriendCodeRowProps) {
    const expiresAt = Math.floor(new Date(invite.expires_at!).getTime() / 1000);

    return (
        <Flex className={cl("row")} alignItems="center" justifyContent="space-between" gap="16px">
            <div>
                <Text tag="h4" size="md" weight="semibold" className={cl("row-code")}>
                    {invite.code}
                </Text>
                <Text size="sm" className={cl("row-details")}>
                    Expires {Parser.parse(`<t:${expiresAt}:R>`)} • {invite.uses}/{invite.max_uses} uses
                </Text>
            </div>
            <CopyButton
                copyText="Copy"
                copiedText="Copied"
                onClick={() => copyToClipboard(`https://discord.gg/${invite.code}`)}
            />
        </Flex>
    );
}
