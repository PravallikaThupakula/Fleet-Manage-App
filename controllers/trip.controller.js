import { supabase } from '../config/supabase.js';

export const createTrip = async (req, res) => {
  const { customer_id, vehicle_id, passengers, distance_km } = req.body;

  const { data: vehicle } = await supabase
    .from('vehicles')
    .select('*')
    .eq('id', vehicle_id)
    .single();

  if (!vehicle.isAvailable) {
    return res.status(400).json({ message: 'Vehicle not available' });
  }

  if (passengers > vehicle.allowed_passengers) {
    return res.status(400).json({ message: 'Passenger limit exceeded' });
  }

  await supabase.from('trips').insert([req.body]);
  await supabase.from('vehicles').update({ isAvailable: false }).eq('id', vehicle_id);

  res.status(201).json({ message: 'Trip created' });
};

export const endTrip = async (req, res) => {
  const { tripId } = req.params;

  const { data: trip } = await supabase
    .from('trips')
    .select('distance_km, vehicle_id')
    .eq('id', tripId)
    .single();

  const { data: vehicle } = await supabase
    .from('vehicles')
    .select('rate_per_km')
    .eq('id', trip.vehicle_id)
    .single();

  const tripCost = trip.distance_km * vehicle.rate_per_km;

  await supabase.from('trips').update({
    isCompleted: true,
    tripCost
  }).eq('id', tripId);

  await supabase.from('vehicles').update({
    isAvailable: true
  }).eq('id', trip.vehicle_id);

  res.json({ message: 'Trip ended', tripCost });
};
