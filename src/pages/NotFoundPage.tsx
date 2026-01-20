import { Link } from 'react-router-dom';
import EmptyState from '../components/EmptyState';
import Icon from '../components/icons';

export default function NotFoundPage() {
  return (
    <section className="page">
        <EmptyState
          title="No encontramos esta ruta"
          description="Revisa la URL o vuelve al listado principal."
          action={
            <Link to="/characters" className="primary-button">
              <Icon name="list" />
              Ir a personajes
            </Link>
          }
        />
      </section>
  );
}
