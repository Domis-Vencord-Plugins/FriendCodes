/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import definePlugin from "@utils/types";

import FriendCodesPanel from "./components/FriendCodesPanel";

export default definePlugin({
    name: "FriendCodes",
    description: "Generate FriendCodes to easily add friends",
    authors: [{ name: "domi.btnr", id: 354191516979429376n }],
    patches: [
        {
            find: "#{intl::ADD_FRIEND})}),(",
            replacement: {
                match: /\.Fragment,\{children:\[(\(0,\i\.jsx\)\(\i,\{\}\)),(\(0,\i\.jsx\)\(\i,\{\}\))\]/,
                replace: ".Fragment,{children:[$1,$self.FriendCodesPanel,$2]"
            }
        }
    ],

    get FriendCodesPanel() {
        return <FriendCodesPanel />;
    }
});
