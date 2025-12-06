'use client';

import { useState } from 'react';
import { useAuth } from '@/components/providers/auth-provider';
import { mockApi } from '@/lib/mock-api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const venueOptions = [
  {
    id: 'bellagio-restaurant',
    name: 'Picasso at Bellagio',
    type: 'restaurant' as const,
    description: 'Two Michelin stars, French-Mediterranean cuisine',
    icon: '🍽️',
    minGuests: 1,
    maxGuests: 8,
  },
  {
    id: 'xs-nightclub',
    name: 'XS Nightclub at Encore',
    type: 'nightclub' as const,
    description: 'Premier nightclub with world-class DJs',
    icon: '🎉',
    minGuests: 2,
    maxGuests: 20,
  },
  {
    id: 'cosmopolitan-suite',
    name: 'Cosmopolitan Terrace Suite',
    type: 'hotel' as const,
    description: 'Luxury penthouse with panoramic views',
    icon: '🏨',
    minGuests: 1,
    maxGuests: 4,
  },
  {
    id: 'aria-spa',
    name: 'Spa & Salon at Aria',
    type: 'spa' as const,
    description: 'World-class spa treatments and relaxation',
    icon: '💆',
    minGuests: 1,
    maxGuests: 4,
  },
  {
    id: 'wynn-poker',
    name: 'Private Gaming Suite at Wynn',
    type: 'event' as const,
    description: 'Exclusive high-limit poker room',
    icon: '🎭',
    minGuests: 4,
    maxGuests: 12,
  },
  {
    id: 'hells-kitchen',
    name: 'Gordon Ramsay Hell\'s Kitchen',
    type: 'restaurant' as const,
    description: 'Celebrity chef experience with open kitchen',
    icon: '🍽️',
    minGuests: 2,
    maxGuests: 10,
  },
  {
    id: 'omnia-nightclub',
    name: 'Omnia Nightclub',
    type: 'nightclub' as const,
    description: 'Multi-level nightclub with LED ceiling',
    icon: '🎉',
    minGuests: 2,
    maxGuests: 15,
  },
  {
    id: 'waldorf-spa',
    name: 'Waldorf Astoria Spa',
    type: 'spa' as const,
    description: 'Luxury spa with private treatment suites',
    icon: '💆',
    minGuests: 1,
    maxGuests: 2,
  },
  {
    id: 'cirque-vip',
    name: 'Cirque du Soleil VIP Experience',
    type: 'event' as const,
    description: 'Premium seating with backstage tour',
    icon: '🎭',
    minGuests: 2,
    maxGuests: 8,
  },
  {
    id: 'caesars-villa',
    name: 'Caesars Palace Villa',
    type: 'hotel' as const,
    description: 'Opulent Roman-themed luxury villa',
    icon: '🏨',
    minGuests: 2,
    maxGuests: 6,
  },
];

export default function NewBookingPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState<typeof venueOptions[0] | null>(null);
  const [formData, setFormData] = useState({
    date: '',
    time: '19:00',
    guests: 2,
    specialRequests: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedVenue || !user?.id) {
      alert('Please select a venue');
      return;
    }

    setLoading(true);
    
    try {
      await mockApi.createBooking({
        userId: user.id,
        venueName: selectedVenue.name,
        venueType: selectedVenue.type,
        date: formData.date,
        time: formData.time,
        guests: formData.guests,
        specialRequests: formData.specialRequests || undefined,
      });

      alert('Booking request submitted! Our concierge will confirm shortly.');
      router.push('/dashboard/member/bookings');
    } catch (error) {
      console.error('Booking failed:', error);
      alert('Failed to create booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVenueSelect = (venue: typeof venueOptions[0]) => {
    setSelectedVenue(venue);
    setFormData(prev => ({
      ...prev,
      guests: Math.max(venue.minGuests, Math.min(prev.guests, venue.maxGuests)),
    }));
  };

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <Link 
          href="/dashboard/member/bookings"
          className="text-primary hover:underline mb-4 inline-block"
        >
          ← Back to Bookings
        </Link>
        <h1 className="text-3xl font-bold mb-2">New Booking Request</h1>
        <p className="text-muted-foreground">
          Select a venue and provide your preferences. Our concierge will confirm your booking within 24 hours.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Venue Selection */}
        <div className="bg-secondary border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Select Venue</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {venueOptions.map((venue) => (
              <button
                key={venue.id}
                type="button"
                onClick={() => handleVenueSelect(venue)}
                className={`text-left p-4 rounded-lg border-2 transition-all ${
                  selectedVenue?.id === venue.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="text-3xl">{venue.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{venue.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {venue.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        venue.type === 'restaurant' ? 'bg-orange-500/10 text-orange-500' :
                        venue.type === 'nightclub' ? 'bg-purple-500/10 text-purple-500' :
                        venue.type === 'hotel' ? 'bg-blue-500/10 text-blue-500' :
                        venue.type === 'spa' ? 'bg-green-500/10 text-green-500' :
                        'bg-pink-500/10 text-pink-500'
                      }`}>
                        {venue.type}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {venue.minGuests}-{venue.maxGuests} guests
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Booking Details */}
        {selectedVenue && (
          <div className="bg-secondary border border-border rounded-lg p-6 space-y-6">
            <h2 className="text-xl font-semibold">Booking Details</h2>

            {/* Selected Venue Summary */}
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{selectedVenue.icon}</span>
                <div>
                  <h3 className="font-semibold">{selectedVenue.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedVenue.description}</p>
                </div>
              </div>
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Preferred Date *
              </label>
              <input
                type="date"
                required
                min={today}
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Time */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Preferred Time *
              </label>
              <select
                required
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="12:00">12:00 PM</option>
                <option value="13:00">1:00 PM</option>
                <option value="14:00">2:00 PM</option>
                <option value="15:00">3:00 PM</option>
                <option value="16:00">4:00 PM</option>
                <option value="17:00">5:00 PM</option>
                <option value="18:00">6:00 PM</option>
                <option value="19:00">7:00 PM</option>
                <option value="20:00">8:00 PM</option>
                <option value="21:00">9:00 PM</option>
                <option value="22:00">10:00 PM</option>
                <option value="23:00">11:00 PM</option>
              </select>
            </div>

            {/* Guests */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Number of Guests *
              </label>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ 
                    ...formData, 
                    guests: Math.max(selectedVenue.minGuests, formData.guests - 1) 
                  })}
                  className="w-12 h-12 rounded-lg bg-background border border-border hover:border-primary transition-colors flex items-center justify-center text-xl font-semibold"
                  disabled={formData.guests <= selectedVenue.minGuests}
                >
                  −
                </button>
                <div className="flex-1 text-center">
                  <div className="text-3xl font-bold">{formData.guests}</div>
                  <div className="text-sm text-muted-foreground">
                    {formData.guests === 1 ? 'guest' : 'guests'}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setFormData({ 
                    ...formData, 
                    guests: Math.min(selectedVenue.maxGuests, formData.guests + 1) 
                  })}
                  className="w-12 h-12 rounded-lg bg-background border border-border hover:border-primary transition-colors flex items-center justify-center text-xl font-semibold"
                  disabled={formData.guests >= selectedVenue.maxGuests}
                >
                  +
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                This venue accommodates {selectedVenue.minGuests}-{selectedVenue.maxGuests} guests
              </p>
            </div>

            {/* Special Requests */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Special Requests (Optional)
              </label>
              <textarea
                value={formData.specialRequests}
                onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                rows={4}
                placeholder="Any special requirements, dietary restrictions, occasion details, seating preferences, etc."
                className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Our concierge will do their best to accommodate your requests
              </p>
            </div>
          </div>
        )}

        {/* Important Notes */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <h3 className="font-semibold mb-2 text-blue-500">📋 Important Information</h3>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• Booking confirmation typically within 24 hours</li>
            <li>• Our concierge will contact you to finalize details</li>
            <li>• Changes can be made up to 48 hours before your booking</li>
            <li>• Cancellation policy varies by venue</li>
          </ul>
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={!selectedVenue || loading}
            className="flex-1 bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Submitting...' : 'Submit Booking Request'}
          </button>
          <Link
            href="/dashboard/member/bookings"
            className="px-6 py-3 rounded-lg border border-border hover:border-primary transition-colors font-medium text-center"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

