'use client'

import { useState, useEffect } from 'react'
import { MapPin, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Country {
  code: string
  name: string
  cities: string[]
}

// Lista de países y ciudades principales
const countries: Country[] = [
  {
    code: 'MX',
    name: 'México',
    cities: ['Ciudad de México', 'Guadalajara', 'Monterrey', 'Puebla', 'Tijuana', 'León', 'Querétaro', 'Mérida', 'Cancún', 'Toluca']
  },
  {
    code: 'US',
    name: 'United States',
    cities: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose']
  },
  {
    code: 'CA',
    name: 'Canada',
    cities: ['Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Edmonton', 'Ottawa', 'Winnipeg', 'Quebec City', 'Hamilton', 'Kitchener']
  },
  {
    code: 'CO',
    name: 'Colombia',
    cities: ['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena', 'Cúcuta', 'Bucaramanga', 'Pereira', 'Santa Marta', 'Ibagué']
  },
  {
    code: 'AR',
    name: 'Argentina',
    cities: ['Buenos Aires', 'Córdoba', 'Rosario', 'Mendoza', 'Tucumán', 'La Plata', 'Mar del Plata', 'Salta', 'Santa Fe', 'San Juan']
  },
  {
    code: 'BR',
    name: 'Brazil',
    cities: ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador', 'Fortaleza', 'Belo Horizonte', 'Manaus', 'Curitiba', 'Recife', 'Porto Alegre']
  },
  {
    code: 'CL',
    name: 'Chile',
    cities: ['Santiago', 'Valparaíso', 'Concepción', 'La Serena', 'Antofagasta', 'Temuco', 'Rancagua', 'Talca', 'Arica', 'Iquique']
  },
  {
    code: 'PE',
    name: 'Peru',
    cities: ['Lima', 'Arequipa', 'Trujillo', 'Chiclayo', 'Piura', 'Iquitos', 'Cusco', 'Huancayo', 'Tacna', 'Ica']
  },
  {
    code: 'ES',
    name: 'Spain',
    cities: ['Madrid', 'Barcelona', 'Valencia', 'Seville', 'Zaragoza', 'Málaga', 'Murcia', 'Palma', 'Las Palmas', 'Bilbao']
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    cities: ['London', 'Manchester', 'Birmingham', 'Glasgow', 'Liverpool', 'Leeds', 'Edinburgh', 'Bristol', 'Cardiff', 'Belfast']
  },
  {
    code: 'FR',
    name: 'France',
    cities: ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg', 'Montpellier', 'Bordeaux', 'Lille']
  },
  {
    code: 'DE',
    name: 'Germany',
    cities: ['Berlin', 'Munich', 'Hamburg', 'Cologne', 'Frankfurt', 'Stuttgart', 'Düsseldorf', 'Dortmund', 'Essen', 'Leipzig']
  },
  {
    code: 'IN',
    name: 'India',
    cities: ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Surat']
  },
  {
    code: 'CN',
    name: 'China',
    cities: ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen', 'Chengdu', 'Hangzhou', 'Wuhan', 'Xi\'an', 'Nanjing', 'Tianjin']
  },
  {
    code: 'JP',
    name: 'Japan',
    cities: ['Tokyo', 'Osaka', 'Yokohama', 'Nagoya', 'Sapporo', 'Fukuoka', 'Kobe', 'Kyoto', 'Kawasaki', 'Saitama']
  },
  {
    code: 'AU',
    name: 'Australia',
    cities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Gold Coast', 'Newcastle', 'Canberra', 'Sunshine Coast', 'Wollongong']
  }
]

interface LocationSelectorProps {
  value?: string
  onChange: (location: string) => void
  placeholder?: string
  className?: string
}

export default function LocationSelector({ 
  value = '', 
  onChange, 
  placeholder = 'Select country and city',
  className = '' 
}: LocationSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)
  const [selectedCity, setSelectedCity] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState('')

  // Parse initial value if provided
  useEffect(() => {
    if (value) {
      const parts = value.split(', ')
      if (parts.length >= 2) {
        const city = parts[0].trim()
        const countryName = parts.slice(1).join(', ').trim()
        const country = countries.find(c => c.name === countryName)
        if (country) {
          setSelectedCountry(country)
          setSelectedCity(city)
        }
      }
    }
  }, [value])

  // Update parent when selection changes
  useEffect(() => {
    if (selectedCountry && selectedCity) {
      onChange(`${selectedCity}, ${selectedCountry.name}`)
    } else if (selectedCountry) {
      onChange(selectedCountry.name)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCountry, selectedCity])

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.cities.some(city => city.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country)
    setSelectedCity('')
    setSearchTerm('')
    if (country.cities.length === 1) {
      setSelectedCity(country.cities[0])
    }
  }

  const handleCitySelect = (city: string) => {
    setSelectedCity(city)
    setIsOpen(false)
    setSearchTerm('')
  }

  const displayValue = selectedCountry && selectedCity 
    ? `${selectedCity}, ${selectedCountry.name}`
    : selectedCountry 
    ? selectedCountry.name
    : value || ''

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-white placeholder-white/50 backdrop-blur-xl focus:ring-somnia-purple/20 transition-all duration-300 font-mono flex items-center justify-between"
      >
        <div className="flex items-center space-x-2 flex-1 text-left">
          <MapPin className="w-4 h-4 text-white/70 flex-shrink-0" />
          <span className={displayValue ? 'text-white' : 'text-white/50'}>
            {displayValue || placeholder}
          </span>
        </div>
        <ChevronDown 
          className={`w-4 h-4 text-white/70 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-2 backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl shadow-2xl max-h-96 overflow-hidden"
          >
            {/* Search */}
            <div className="p-3 border-b border-white/10">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search country or city..."
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-somnia-purple/50 text-sm"
                autoFocus
              />
            </div>

            {/* Countries List */}
            <div className="max-h-80 overflow-y-auto">
              {filteredCountries.map((country) => (
                <div key={country.code}>
                  <button
                    type="button"
                    onClick={() => handleCountrySelect(country)}
                    className={`w-full px-4 py-3 text-left hover:bg-white/10 transition-colors flex items-center justify-between ${
                      selectedCountry?.code === country.code ? 'bg-somnia-purple/20' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-semibold">
                        {country.code === 'MX' && '🇲🇽'}
                        {country.code === 'US' && '🇺🇸'}
                        {country.code === 'CA' && '🇨🇦'}
                        {country.code === 'CO' && '🇨🇴'}
                        {country.code === 'AR' && '🇦🇷'}
                        {country.code === 'BR' && '🇧🇷'}
                        {country.code === 'CL' && '🇨🇱'}
                        {country.code === 'PE' && '🇵🇪'}
                        {country.code === 'ES' && '🇪🇸'}
                        {country.code === 'GB' && '🇬🇧'}
                        {country.code === 'FR' && '🇫🇷'}
                        {country.code === 'DE' && '🇩🇪'}
                        {country.code === 'IN' && '🇮🇳'}
                        {country.code === 'CN' && '🇨🇳'}
                        {country.code === 'JP' && '🇯🇵'}
                        {country.code === 'AU' && '🇦🇺'}
                        {!['MX', 'US', 'CA', 'CO', 'AR', 'BR', 'CL', 'PE', 'ES', 'GB', 'FR', 'DE', 'IN', 'CN', 'JP', 'AU'].includes(country.code) && '🌍'}
                      </span>
                      <span className="text-white font-medium">{country.name}</span>
                    </div>
                  </button>
                  
                  {/* Cities for selected country */}
                  {selectedCountry?.code === country.code && (
                    <div className="pl-8 pr-4 pb-2 space-y-1">
                      {country.cities.map((city) => (
                        <button
                          key={city}
                          type="button"
                          onClick={() => handleCitySelect(city)}
                          className={`w-full px-3 py-2 text-left text-sm rounded-lg hover:bg-white/10 transition-colors ${
                            selectedCity === city ? 'bg-mx-green/20 text-mx-green' : 'text-white/80'
                          }`}
                        >
                          {city}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay to close on outside click */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}

