import Image from 'next/image';
import { Trophy } from 'lucide-react';
import clsx from 'clsx';
import type { Org } from '@/content/orgs';

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();

/**
 * Square logo tile for an organisation. Logos sit on white in both themes,
 * because that is the background they were drawn for. The image is
 * decorative: the organisation's name is always printed next to the tile.
 */
export function OrgLogo({
  org,
  size = 56,
  className,
}: {
  org: Org;
  size?: number;
  className?: string;
}) {
  const box = clsx(
    'grid shrink-0 place-items-center overflow-hidden border border-hairline',
    size >= 48 ? 'rounded-xl' : 'rounded-lg',
    className,
  );
  const style = { width: size, height: size };

  if (org.logo) {
    return (
      <span className={clsx(box, 'bg-white')} style={style}>
        <Image
          src={org.logo}
          alt=""
          width={size}
          height={size}
          className={clsx(
            'h-full w-full',
            org.fit === 'cover' ? 'object-cover' : 'object-contain p-[10%]',
          )}
        />
      </span>
    );
  }

  return (
    <span
      aria-hidden
      className={clsx(box, 'bg-surface-2 text-fg-muted')}
      style={style}
    >
      {org.icon === 'trophy' ? (
        <Trophy style={{ width: size * 0.42, height: size * 0.42 }} strokeWidth={1.5} />
      ) : (
        <span
          className="font-serif leading-none"
          style={{ fontSize: size * 0.36 }}
        >
          {initials(org.name)}
        </span>
      )}
    </span>
  );
}
