/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import "./FriendCodesPanel.css";

import { Button } from "@components/Button";
import ErrorBoundary from "@components/ErrorBoundary";
import { Flex } from "@components/Flex";
import { Text } from "@components/Text";
import { classNameFactory } from "@utils/css";
import { showToast, useEffect, useState, useStateFromStores } from "@webpack/common";

import FriendInvitesStore, { fetchInvites } from "../modules/store";
import { Errors, logger } from "../modules/utils";
import { InviteModule } from "../modules/webpack";
import FriendCodeRow from "./FriendCodeRow";

const cl = classNameFactory("vc-friend-codes-");

function PanelContent() {
    const invites = useStateFromStores([FriendInvitesStore], () => FriendInvitesStore.getInvites());
    const loaded = useStateFromStores([FriendInvitesStore], () => FriendInvitesStore.hasLoaded());
    const failed = useStateFromStores([FriendInvitesStore], () => FriendInvitesStore.hasFailed());

    if (!loaded && failed) {
        return (
            <div className={cl("panel-empty")}>
                <Text size="sm" className={cl("panel-muted")}>Couldn't load your friend codes.</Text>
                <Button size="small" onClick={fetchInvites}>Try Again</Button>
            </div>
        );
    }

    if (!loaded) {
        return (
            <div className={cl("panel-empty")}>
                <Text size="sm" className={cl("panel-muted")}>Loading...</Text>
            </div>
        );
    }

    if (!invites.length) {
        return (
            <div className={cl("panel-empty")}>
                <Text size="sm" className={cl("panel-muted")}>You don't have any friend codes yet.</Text>
            </div>
        );
    }

    return invites.map(invite => <FriendCodeRow key={invite.code} invite={invite} />);
}

function PanelBody() {
    const count = useStateFromStores([FriendInvitesStore], () => FriendInvitesStore.getInvites().length);
    const [pending, setPending] = useState(false);

    useEffect(() => {
        fetchInvites();
    }, []);

    const runRequest = (request: () => Promise<unknown>, error: string) => {
        setPending(true);
        request()
            .catch(err => {
                logger.error(error, err);
                showToast({ text: error, variant: "critical" });
            })
            .finally(() => setPending(false));
    };

    return (
        <>
            <Flex className={cl("panel-header")} alignItems="flex-start" justifyContent="space-between" flexWrap="wrap" gap="12px 16px">
                <div className={cl("panel-heading")}>
                    <Text tag="h2" size="lg" weight="semibold" className={cl("panel-title")}>
                        Your Friend Codes
                    </Text>
                    <Text size="sm" className={cl("panel-description")}>
                        Share a friend code so others can add you without knowing your username.
                    </Text>
                </div>
                <Flex className={cl("panel-actions")} justifyContent="flex-end" gap="8px">
                    <Button
                        variant="dangerSecondary"
                        size="small"
                        disabled={pending || !count}
                        onClick={() => runRequest(InviteModule.revokeFriendInvites, Errors.revoke)}
                    >
                        Revoke All
                    </Button>
                    <Button
                        size="small"
                        disabled={pending}
                        onClick={() => runRequest(InviteModule.createFriendInvite, Errors.create)}
                    >
                        Create Friend Code
                    </Button>
                </Flex>
            </Flex>

            <Text tag="h3" size="xs" weight="semibold" className={cl("panel-count")}>
                Friend Codes — {count}
            </Text>
            <div className={cl("panel-list")}>
                <PanelContent />
            </div>
        </>
    );
}

export default function FriendCodesPanel() {
    return (
        <header className={cl("panel")}>
            <ErrorBoundary message="Failed to render your friend codes.">
                <PanelBody />
            </ErrorBoundary>
        </header>
    );
}
