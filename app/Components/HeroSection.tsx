import Link from 'next/link';

const trustBadges = [
  {
    label: 'ISO 9001',
    description: 'Quality Management',
    icon: (
      <svg viewBox="0 0 60 32" className="h-7 w-auto" fill="currentColor">
        <text x="0" y="24" fontSize="13" fontWeight="700"
          fontFamily="Arial, sans-serif" letterSpacing="1">ISO</text>
        <text x="28" y="24" fontSize="13" fontWeight="400"
          fontFamily="Arial, sans-serif">9001</text>
      </svg>
    ),
  },
  {
    label: 'IATF 16949',
    description: 'Automotive Quality',
    icon: (
      <svg viewBox="0 0 80 32" className="h-7 w-auto" fill="currentColor">
        <text x="0" y="24" fontSize="11" fontWeight="700"
          fontFamily="Arial, sans-serif" letterSpacing="1">IATF</text>
        <text x="34" y="24" fontSize="11" fontWeight="400"
          fontFamily="Arial, sans-serif">16949</text>
      </svg>
    ),
  },
  {
    label: 'Six Sigma',
    description: 'Process Excellence',
    icon: (
      <svg viewBox="0 0 80 32" className="h-7 w-auto" fill="currentColor">
        <text x="0" y="24" fontSize="11" fontWeight="700"
          fontFamily="Arial, sans-serif" letterSpacing="0.5">Six Sigma</text>
      </svg>
    ),
  },
  {
    label: 'AS 9100D',
    description: 'Aerospace  and  Defense Quality',
    icon: (
      <svg viewBox="0 0 72 32" className="h-7 w-auto" fill="currentColor">
        <text x="0" y="24" fontSize="11" fontWeight="700"
          fontFamily="Arial, sans-serif" letterSpacing="1">AS</text>
        <text x="22" y="24" fontSize="11" fontWeight="400"
          fontFamily="Arial, sans-serif">9100D</text>
      </svg>
    ),
  },
];

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[92vh] flex flex-col
                        bg-white dark:bg-gray-950
                        transition-colors duration-300">

      {/* ─── Subtle background decoration (no image) ─── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Top-right soft glow — light mode */}
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full
                        bg-blue-100 dark:bg-blue-950/40 opacity-60 dark:opacity-30
                        blur-3xl" />
        {/* Bottom-left soft glow */}
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full
                        bg-indigo-100 dark:bg-indigo-950/40 opacity-40 dark:opacity-20
                        blur-3xl" />
      </div>

      {/* ─── Hero Content ─── */}
      <div className="relative z-10 flex flex-1 items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div className="max-w-3xl">

            {/* Eyebrow label */}
            <div className="inline-flex items-center gap-2 mb-6">
              <span
                className="h-px w-8"
                style={{ backgroundColor: 'var(--color-primary)' }}
              />
              <span
                className="text-sm font-semibold uppercase tracking-widest"
                style={{ color: 'var(--color-primary)' }}
              >
                Manufacturing Excellence
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold
                           text-gray-900 dark:text-white
                           leading-tight tracking-tight mb-6
                           transition-colors duration-300">
              Expert Consulting &{' '}
              <span style={{ color: 'var(--color-primary)' }}>Training</span>{' '}
              for Manufacturing
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl leading-relaxed max-w-2xl mb-10
                          text-gray-600 dark:text-gray-300
                          transition-colors duration-300">
              We provide complete implementation guides for businesses of any size
              to achieve{' '}
              <span className="font-semibold text-gray-900 dark:text-white
                               transition-colors duration-300">
                operational excellence
              </span>.
              From ISO certification to Six Sigma, we guide you every step of the way.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">

              {/* Primary CTA */}
              <Link href="/consultation" className="btn-primary">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Book a Consultation
              </Link>

              {/* Secondary CTA — adapts for light/dark */}
              <Link
                href="/courses"
                className="inline-flex items-center justify-center gap-2
                           font-semibold text-base px-8 py-4 rounded-lg
                           border transition-all duration-200 hover:-translate-y-0.5
                           text-gray-700 dark:text-gray-200
                           bg-white dark:bg-gray-800
                           border-gray-200 dark:border-gray-700
                           hover:border-blue-300 dark:hover:border-blue-600
                           hover:bg-blue-50 dark:hover:bg-gray-700
                           hover:text-blue-600 dark:hover:text-blue-400"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                View Our Courses
              </Link>
            </div>

            {/* Stats Row */}
            <div className="flex flex-wrap gap-8 mt-12 pt-10
                            border-t border-gray-200 dark:border-gray-800
                            transition-colors duration-300">
              {[
                { value: '500+', label: 'Businesses Certified' },
                { value: '15+',  label: 'Years of Experience' },
                { value: '98%',  label: 'Client Satisfaction' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p
                    className="text-3xl font-bold"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-sm mt-1 text-gray-500 dark:text-gray-400
                                transition-colors duration-300">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* ─── Trust Banner ─── */}
      <div className="relative z-10 w-full border-t
                      bg-gray-50 dark:bg-gray-900/80
                      border-gray-200 dark:border-gray-800
                      backdrop-blur-sm transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10">

            {/* Label */}
            <p className="text-xs font-semibold uppercase tracking-widest whitespace-nowrap
                          text-gray-400 dark:text-gray-500">
              Expertise in Global Standards:
            </p>

            {/* Vertical Divider */}
            <div className="hidden sm:block h-6 w-px
                            bg-gray-200 dark:bg-gray-700" />

            {/* Badges */}
            <div className="flex flex-wrap items-center justify-center
                            sm:justify-start gap-6 sm:gap-10">
              {trustBadges.map((badge) => (
                <div
                  key={badge.label}
                  className="flex flex-col items-center gap-1 group cursor-default"
                  title={badge.description}
                >
                  <div className="opacity-50 group-hover:opacity-100
                                  transition-all duration-200
                                  text-gray-500 dark:text-gray-400
                                  group-hover:text-gray-800 dark:group-hover:text-gray-200">
                    {badge.icon}
                  </div>
                  <span className="text-xs text-gray-400 dark:text-gray-500
                                   group-hover:text-gray-600 dark:group-hover:text-gray-300
                                   transition-colors duration-200">
                    {badge.description}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}