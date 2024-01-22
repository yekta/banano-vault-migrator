export interface TWallet {
	title: string;
	description: string;
	buttonText: string;
	url: string;
	img: string;
}

export type TButton =
	| 'primary'
	| 'secondary'
	| 'bg'
	| 'discord'
	| 'reddit'
	| 'twitter'
	| 'instagram'
	| 'telegram'
	| 'facebook'
	| 'youtube'
	| 'medium';

export type TIconSocial =
	| 'discord'
	| 'reddit'
	| 'twitter'
	| 'instagram'
	| 'telegram'
	| 'facebook'
	| 'github'
	| 'medium'
	| 'youtube'
	| 'email';
