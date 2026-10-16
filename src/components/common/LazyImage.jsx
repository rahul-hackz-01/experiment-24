import React, { useState } from 'react';

/**
 * LazyImage Component
 * Topics: Image Optimization, Lazy Loading, Accessibility (Requirement 10.c, 10.e)
 */
export default function LazyImage({ src, alt, width = '100%', height = 'auto', className = '' }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={`lazy-image-wrapper ${className}`}
      style={{
        position: 'relative',
        width,
        height,
        overflow: 'hidden',
        backgroundColor: '#ead9dc',
        borderRadius: '6px'
      }}
    >
      {/* Skeleton Shimmer Placeholder */}
      {!isLoaded && !hasError && (
        <div
          className="skeleton-shimmer"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(90deg, #f6eaec 25%, #ead9dc 50%, #f6eaec 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite'
          }}
          aria-hidden="true"
        />
      )}

      {hasError ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            color: '#b89ba2',
            fontSize: '0.8rem',
            padding: '1rem'
          }}
        >
          📖 Image Unavailable
        </div>
      ) : (
        <img
          src={src}
          alt={alt || 'Library Book Cover'}
          loading="lazy" // c) Native Browser Lazy Loading
          decoding="async" // c) Asynchronous Image Decoding
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out',
            display: 'block'
          }}
        />
      )}
    </div>
  );
}
