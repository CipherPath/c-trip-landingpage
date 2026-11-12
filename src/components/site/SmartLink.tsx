import { forwardRef } from 'react'
import type { AnchorHTMLAttributes } from 'react'
import { Link } from '@tanstack/react-router'

type SmartLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

/**
 * Internal paths ("/sobre", "/#servicos") go through the router (client-side navigation, hash scroll);
 * everything else ("#", "mailto:", external URLs) renders a plain anchor.
 */
export const SmartLink = forwardRef<HTMLAnchorElement, SmartLinkProps>(function SmartLink({ href, ...rest }, ref) {
  if (href.startsWith('/')) {
    const [path, hash] = href.split('#')
    return (
      <Link
        ref={ref}
        to={(path || '/') as never}
        hash={hash}
        activeOptions={{ exact: true, includeHash: !!hash }}
        {...rest}
      />
    )
  }
  return <a ref={ref} href={href} {...rest} />
})
