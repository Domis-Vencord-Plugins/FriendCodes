/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { FriendInvite } from "@vencord/discord-types";
import { findByPropsLazy } from "@webpack";

interface InviteModule {
    createFriendInvite(): Promise<FriendInvite>;
    getAllFriendInvites(): Promise<FriendInvite[]>;
    revokeFriendInvites(): Promise<void>;
}

export const InviteModule: InviteModule = findByPropsLazy("createFriendInvite", "getAllFriendInvites", "revokeFriendInvites");
