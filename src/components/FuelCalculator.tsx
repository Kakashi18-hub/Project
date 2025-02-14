import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Car, Zap, Leaf, DollarSign, Sun, Moon } from 'lucide-react';
import { Input } from './ui/input';
import { calculateCO2Emissions, calculateFuelCost } from '@/lib/utils';

interface VehicleData {
  make: string;
  model: string;
  fuelType: string;
  efficiency: number;
  fuelPrice: number;
  distance: number;
}

export function FuelCalculator() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [vehicleData, setVehicleData] = useState<VehicleData>({
    make: '',
    model: '',
    fuelType: 'petrol',
    efficiency: 15, // Default km/L
    fuelPrice: 100, // Default INR/L
    distance: 100, // Default km
  });

  const co2Emissions = calculateCO2Emissions(
    vehicleData.fuelType,
    vehicleData.distance,
    vehicleData.efficiency
  );

  const fuelCost = calculateFuelCost(
    vehicleData.distance,
    vehicleData.efficiency,
    vehicleData.fuelPrice
  );

  const costData = Array.from({ length: 12 }, (_, i) => ({
    month: i + 1,
    cost: fuelCost * (i + 1),
    electricCost: (fuelCost * (i + 1)) * 0.3,
  }));

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${isDarkMode ? 'from-gray-900 to-gray-800' : 'from-blue-50 to-green-50'} p-6`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-700/20 transition-colors"
          >
            {isDarkMode ? <Sun className="w-6 h-6 text-yellow-400" /> : <Moon className="w-6 h-6 text-gray-700" />}
          </button>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8`}
        >
          <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-8 flex items-center gap-2`}>
            <Car className={`w-8 h-8 ${isDarkMode ? 'text-green-400' : 'text-green-500'}`} />
            Fuel Efficiency Calculator
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Make</label>
                  <Input
                    type="text"
                    value={vehicleData.make}
                    onChange={(e) => setVehicleData({ ...vehicleData, make: e.target.value })}
                    className={`w-full ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : ''}`}
                    placeholder="e.g., Maruti"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Model</label>
                  <Input
                    type="text"
                    value={vehicleData.model}
                    onChange={(e) => setVehicleData({ ...vehicleData, model: e.target.value })}
                    className={`w-full ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : ''}`}
                    placeholder="e.g., Swift"
                  />
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Fuel Type</label>
                <select
                  value={vehicleData.fuelType}
                  onChange={(e) => setVehicleData({ ...vehicleData, fuelType: e.target.value })}
                  className={`w-full h-10 rounded-md border px-3 py-2 text-sm ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'
                  }`}
                >
                  <option value="petrol">Petrol</option>
                  <option value="diesel">Diesel</option>
                  <option value="electric">Electric</option>
                  <option value="cng">CNG</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                  Efficiency (km/L)
                </label>
                <Input
                  type="number"
                  value={vehicleData.efficiency}
                  onChange={(e) => setVehicleData({ ...vehicleData, efficiency: Number(e.target.value) })}
                  className={`w-full ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : ''}`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                  Fuel Price (₹/L)
                </label>
                <Input
                  type="number"
                  value={vehicleData.fuelPrice}
                  onChange={(e) => setVehicleData({ ...vehicleData, fuelPrice: Number(e.target.value) })}
                  className={`w-full ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : ''}`}
                  step="0.01"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                  Distance (km)
                </label>
                <Input
                  type="number"
                  value={vehicleData.distance}
                  onChange={(e) => setVehicleData({ ...vehicleData, distance: Number(e.target.value) })}
                  className={`w-full ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : ''}`}
                />
              </div>
            </div>

            <div className="space-y-6">
              <motion.div
                className={`${isDarkMode ? 'bg-gradient-to-r from-green-900/50 to-blue-900/50' : 'bg-gradient-to-r from-green-100 to-blue-100'} rounded-xl p-6`}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className={`text-xl font-semibold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-white' : ''}`}>
                  <Leaf className={`w-6 h-6 ${isDarkMode ? 'text-green-400' : 'text-green-500'}`} />
                  Environmental Impact
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>CO2 Emissions</p>
                    <motion.div
                      className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                    >
                      <motion.div
                        className={`h-full ${isDarkMode ? 'bg-green-400' : 'bg-green-500'}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min((co2Emissions / 100) * 100, 100)}%` }}
                      />
                    </motion.div>
                    <p className={`text-sm font-medium mt-1 ${isDarkMode ? 'text-white' : ''}`}>{co2Emissions.toFixed(2)} kg CO2</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className={`${isDarkMode ? 'bg-gradient-to-r from-blue-900/50 to-purple-900/50' : 'bg-gradient-to-r from-blue-100 to-purple-100'} rounded-xl p-6`}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <h3 className={`text-xl font-semibold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-white' : ''}`}>
                  <DollarSign className={`w-6 h-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`} />
                  Cost Analysis
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={costData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#e5e7eb'} />
                      <XAxis dataKey="month" stroke={isDarkMode ? '#9CA3AF' : '#4B5563'} />
                      <YAxis stroke={isDarkMode ? '#9CA3AF' : '#4B5563'} />
                      <Tooltip contentStyle={{ backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF' }} />
                      <Line
                        type="monotone"
                        dataKey="cost"
                        stroke={isDarkMode ? '#60A5FA' : '#4F46E5'}
                        name="Current Vehicle"
                      />
                      <Line
                        type="monotone"
                        dataKey="electricCost"
                        stroke={isDarkMode ? '#34D399' : '#22C55E'}
                        name="Electric Vehicle"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              <motion.div
                className={`${isDarkMode ? 'bg-gradient-to-r from-purple-900/50 to-pink-900/50' : 'bg-gradient-to-r from-purple-100 to-pink-100'} rounded-xl p-6`}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <h3 className={`text-xl font-semibold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-white' : ''}`}>
                  <Zap className={`w-6 h-6 ${isDarkMode ? 'text-purple-400' : 'text-purple-500'}`} />
                  EV Comparison
                </h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
                  Switching to an electric vehicle could save you approximately:
                </p>
                <p className={`text-2xl font-bold ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                  ₹{((fuelCost * 12) * 0.7).toFixed(2)}/year
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}