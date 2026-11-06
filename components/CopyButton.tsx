/*
 * Vencord, a Discord client mod
 * Copyright (c) 2026 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { Button } from "@components/Button";
import { useState } from "@webpack/common";

interface CopyButtonProps {
    copyText: string;
    copiedText: string;
    onClick: () => void;
}

export default function CopyButton({ copyText, copiedText, onClick }: CopyButtonProps) {
    const [copied, setCopied] = useState(false);

    const handleButtonClick = () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
        onClick();
    };

    return (
        <Button onClick={handleButtonClick} variant={copied ? "positive" : "primary"} size="small">
            {copied ? copiedText : copyText}
        </Button>
    );
}
