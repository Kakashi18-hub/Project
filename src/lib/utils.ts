import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateCO2Emissions(fuelType: string, distance: number, efficiency: number): number {
  // CO2 emissions in kg/L
  const emissionFactors = {
    petrol: 2.31,
    diesel: 2.68,
    electric: 0.82, // kg CO2 per kWh (India's electricity grid emission factor)
    cng: 1.96,
  };

  const factor = emissionFactors[fuelType as keyof typeof emissionFactors] || 0;
  return (distance / (efficiency * 100)) * factor; // efficiency is now km/L
}

export function calculateFuelCost(distance: number, efficiency: number, fuelPrice: number): number {
  return (distance / (efficiency * 100)) * fuelPrice; // efficiency is now km/L
}