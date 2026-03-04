export type Scope = undefined | 'single' | 'all' | string[];

export interface GuardOptions {
  scope?: Scope;
  allowDM?: boolean;
  message?: string;
  ownerOnly?: boolean;
  ownerBypassGuild?: boolean;
  ownerBypassDM?: boolean;
}

export interface GuardConfig {
  ownerId?: string;
  allowedGuildId?: string;
  allowedGuildIds?: string[];
  env?: Record<string, string | undefined>;
}

export interface GuardInteractionLike {
  guildId?: string | null;
  user?: { id?: string | null };
  reply(options: { content: string; ephemeral?: boolean }): Promise<unknown>;
}

export declare function getOwnerId(config?: GuardConfig): string | null;
export declare function isOwner(interaction: GuardInteractionLike, config?: GuardConfig): boolean;
export declare function getAllowedGuilds(scope?: Scope, config?: GuardConfig): string[] | null;
export declare function blockIfWrongGuild(
  interaction: GuardInteractionLike,
  options?: GuardOptions,
  config?: GuardConfig
): Promise<boolean>;
export declare function createGuard(
  defaultConfig?: GuardConfig
): (interaction: GuardInteractionLike, options?: GuardOptions) => Promise<boolean>;
