/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { proxyLazy } from "@utils/lazy";
import { FriendInvite } from "@vencord/discord-types";
import { RelationshipType } from "@vencord/discord-types/enums";
import { Flux, FluxDispatcher } from "@webpack/common";

import { logger } from "./utils";
import { InviteModule } from "./webpack";

let invites: FriendInvite[] = [];
let loaded = false;
let failed = false;

const uniqueByCode = (list: FriendInvite[]) => [...new Map(list.map(invite => [invite.code, invite])).values()];

const FriendInvitesStore = proxyLazy(() => {
    class FriendInvitesStore extends Flux.Store {
        getInvites() {
            return invites;
        }

        hasLoaded() {
            return loaded;
        }

        hasFailed() {
            return failed;
        }
    }

    return new FriendInvitesStore(FluxDispatcher, {
        FRIEND_INVITES_FETCH_RESPONSE({ invites: fetched }: { invites: FriendInvite[]; }) {
            invites = uniqueByCode(fetched);
            loaded = true;
            failed = false;
        },
        FRIEND_INVITE_CREATE_SUCCESS({ invite }: { invite: FriendInvite; }) {
            invites = uniqueByCode([...invites, invite]);
        },
        FRIEND_INVITE_REVOKE_SUCCESS() {
            invites = [];
        },
        RELATIONSHIP_ADD({ relationship }: { relationship: { type: RelationshipType; }; }) {
            if (loaded && relationship.type === RelationshipType.FRIEND) queueMicrotask(fetchInvites);
            return false;
        }
    });
});

export function fetchInvites() {
    failed = false;
    FriendInvitesStore.emitChange();

    return InviteModule.getAllFriendInvites().catch(err => {
        logger.error("Failed to fetch friend codes", err);
        failed = true;
        FriendInvitesStore.emitChange();
    });
}

export default FriendInvitesStore;
