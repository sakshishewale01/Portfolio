import { useEffect } from 'react'

/**
 * Hook to set document title and meta description per route.
 * Restores previous title and description upon unmount.
 *
 * @param {string} title - Page title
 * @param {string} [description] - Meta description
 */
export function useDocumentTitle(title, description) {
  useEffect(() => {
    if (typeof document === 'undefined') return

    const previousTitle = document.title
    const formattedTitle = title 
      ? `${title} | Sakshi Shewale` 
      : 'Sakshi Shewale | Software & AI Engineer'
    
    document.title = formattedTitle

    let metaDescription = document.querySelector('meta[name="description"]')
    let previousDescription = ''

    if (description) {
      if (!metaDescription) {
        metaDescription = document.createElement('meta')
        metaDescription.name = 'description'
        document.head.appendChild(metaDescription)
      } else {
        previousDescription = metaDescription.getAttribute('content') || ''
      }
      metaDescription.setAttribute('content', description)
    }

    return () => {
      document.title = previousTitle
      if (metaDescription && previousDescription) {
        metaDescription.setAttribute('content', previousDescription)
      }
    }
  }, [title, description])
}
