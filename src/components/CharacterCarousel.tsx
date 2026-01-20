import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { CharacterSummary } from '../types/api';
import Icon from './icons';

interface CharacterCarouselProps {
  title: string;
  items: CharacterSummary[];
  autoScroll?: boolean;
  singleItem?: boolean;
}

export default function CharacterCarousel({
  title,
  items,
  autoScroll = false,
  singleItem = false
}: CharacterCarouselProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const indexRef = useRef(0);

  const scrollByAmount = (direction: number) => {
    const node = containerRef.current;
    if (!node) return;
    const amount = Math.max(node.clientWidth * 0.8, 260);
    node.scrollBy({ left: amount * direction, behavior: 'smooth' });
  };

  useEffect(() => {
    if (!autoScroll) return;
    const node = containerRef.current;
    if (!node) return;
    const interval = window.setInterval(() => {
      if (!node) return;
      if (singleItem) {
        indexRef.current = (indexRef.current + 1) % items.length;
        const nextLeft = node.clientWidth * indexRef.current;
        node.scrollTo({ left: nextLeft, behavior: 'smooth' });
        return;
      }
      const atEnd = node.scrollLeft + node.clientWidth >= node.scrollWidth - 4;
      const nextLeft = atEnd ? 0 : node.scrollLeft + node.clientWidth * 0.8;
      node.scrollTo({ left: nextLeft, behavior: 'smooth' });
    }, 3500);
    return () => window.clearInterval(interval);
  }, [autoScroll, items.length, singleItem]);

  if (items.length === 0) return null;

  return (
    <section
      className={
        autoScroll
          ? singleItem
            ? 'carousel auto-scroll single'
            : 'carousel auto-scroll'
          : 'carousel'
      }
      aria-label={title}
    >
      <div className="carousel-header">
        <div>
          <p className="kicker">Recomendados</p>
          <h3>{title}</h3>
        </div>
        <div className="carousel-actions">
          <button
            type="button"
            className="ghost-button"
            onClick={() => scrollByAmount(-1)}
            aria-label="Anterior"
          >
            <Icon name="prev" />
          </button>
          <button
            type="button"
            className="ghost-button"
            onClick={() => scrollByAmount(1)}
            aria-label="Siguiente"
          >
            <Icon name="next" />
          </button>
        </div>
      </div>
      <div className="carousel-track" ref={containerRef}>
        {items.map((character) => (
          <Link
            key={character.id}
            to={`/characters/${character.id}`}
            className="carousel-card"
          >
            <img src={character.image} alt={character.name} loading="lazy" />
            <div className="carousel-body">
              <h4>{character.name}</h4>
              <p className="meta">
                {character.species} · {character.status}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
