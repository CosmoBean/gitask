/**
 * Grok BYOK vault — encrypted API key storage via byok-vault.
 * Uses sessionMode: "tab" so unlock persists for the tab session.
 */

import { BYOKVault } from "byok-vault";

let vaultInstance: BYOKVault | null = null;

export function isGrokVaultSupported(): boolean {
	if (typeof window === "undefined") return false;
	if (!window.isSecureContext) return false;
	try {
		if (!window.localStorage) return false;
	} catch {
		return false;
	}
	return !!window.crypto?.subtle;
}

/**
 * Get the singleton Grok vault instance.
 * Safe to call on server (returns null when no window).
 */
export function getGrokVault(): BYOKVault | null {
	if (!isGrokVaultSupported()) return null;
	if (!vaultInstance) {
		vaultInstance = new BYOKVault({
			namespace: "gitask-grok",
			localStorage: window.localStorage,
			sessionMode: "tab",
		});
	}
	return vaultInstance;
}
