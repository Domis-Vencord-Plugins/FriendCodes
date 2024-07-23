import definePlugin from "@utils/types";
import FriendCodesPanel from "./components/FriendCodesPanel";

export default definePlugin({
    name: "FriendCodes",
    description: "Generate FriendCodes to easily add friends",
    authors: [{ name: "domi.btnr", id: 354191516979429376n }],
    patches: [
        {
            find: ".Messages.ADD_FRIEND}),(",
            replacement: {
                match: /\.Fragment[^]*?children:\[[^]*?}\)/,
                replace: "$&,$self.FriendCodesPanel"
            }
        }
    ],

    get FriendCodesPanel() {
        return <FriendCodesPanel />;
    }
});