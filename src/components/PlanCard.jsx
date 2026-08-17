import './PlanCard.css'

function PlanCard({ name, price, period = '/month', description, features, isMostPopular, onSubscribe, accentColor }) {
  return (
    <div className={`plan-card ${isMostPopular ? 'plan-card--popular' : ''}`} style={accentColor ? { '--card-accent': accentColor } : {}}>
      {isMostPopular && (
        <div className="plan-card__badge" aria-label="Most popular plan">
          Most Popular
        </div>
      )}

      {/* Header */}
      <div className="plan-card__header">
        <div className="plan-card__icon" aria-hidden="true">
          {name === 'Basic' && (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="3" width="20" height="14" rx="2"/>
              <path d="M8 21h8M12 17v4"/>
            </svg>
          )}
          {name === 'Standard' && (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/>
            </svg>
          )}
          {name === 'Premium' && (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 20h.01M7 20v-4M12 20v-8M17 20V8M22 4v16"/>
            </svg>
          )}
        </div>
        <h3 className="plan-card__name">{name}</h3>
        <p className="plan-card__description">{description}</p>
      </div>

      {/* Price */}
      <div className="plan-card__price">
        <span className="plan-card__currency">$</span>
        <span className="plan-card__amount">{price}</span>
        <span className="plan-card__period">{period}</span>
      </div>

      {/* Features */}
      <ul className="plan-card__features" aria-label={`${name} plan features`}>
        {features.map((feat, i) => (
          <li key={i} className="plan-card__feature">
            <svg className="plan-card__check" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            {feat}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        className={`btn btn-full plan-card__cta ${isMostPopular ? 'btn-primary' : 'btn-outline'}`}
        onClick={() => onSubscribe({ name, price, description })}
        id={`subscribe-${name.toLowerCase()}-btn`}
        aria-label={`Subscribe to ${name} plan at $${price} per month`}
      >
        Select Plan →
      </button>
    </div>
  )
}

export default PlanCard
