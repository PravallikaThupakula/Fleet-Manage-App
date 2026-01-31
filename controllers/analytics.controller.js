import { supabase } from '../config/supabase.js';

export const analytics = async (req, res) => {
  const roles = ['customer', 'owner', 'driver'];

  const counts = {};
  for (let role of roles) {
    const { count } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .eq('role', role);
    counts[role] = count;
  }

  const { count: vehicles } = await supabase
    .from('vehicles')
    .select('*', { count: 'exact', head: true });

  const { count: trips } = await supabase
    .from('trips')
    .select('*', { count: 'exact', head: true });

  res.json({
    totalCustomers: counts.customer,
    totalOwners: counts.owner,
    totalDrivers: counts.driver,
    totalVehicles: vehicles,
    totalTrips: trips
  });
};
