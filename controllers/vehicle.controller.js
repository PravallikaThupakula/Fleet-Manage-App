import { supabase } from '../config/supabase.js';

export const addVehicle = async (req, res) => {
  const { name, registration_number, allowed_passengers, rate_per_km, owner_id } = req.body;

  const { data: owner } = await supabase
    .from('users')
    .select('role')
    .eq('id', owner_id)
    .single();

  if (owner.role !== 'owner') {
    return res.status(403).json({ message: 'Only owners can add vehicles' });
  }

  const { error } = await supabase.from('vehicles').insert([{
    name,
    registration_number,
    allowed_passengers,
    rate_per_km,
    owner_id
  }]);

  if (error) return res.status(400).json({ error });

  res.status(201).json({ message: 'Vehicle added successfully' });
};

export const assignDriver = async (req, res) => {
  const { vehicleId } = req.params;
  const { driver_id } = req.body;

  const { data: driver } = await supabase
    .from('users')
    .select('role')
    .eq('id', driver_id)
    .single();

  if (driver.role !== 'driver') {
    return res.status(400).json({ message: 'Invalid driver' });
  }

  await supabase
    .from('vehicles')
    .update({ driver_id })
    .eq('id', vehicleId);

  res.json({ message: 'Driver assigned' });
};

export const getVehicle = async (req, res) => {
  const { vehicleId } = req.params;

  const { data } = await supabase
    .from('vehicles')
    .select('*')
    .eq('id', vehicleId)
    .single();

  res.json(data);
};
