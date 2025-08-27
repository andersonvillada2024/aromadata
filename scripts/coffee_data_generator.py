import json
import random
from datetime import datetime, timedelta
import pandas as pd

def generate_coffee_statistics():
    """
    Generate realistic coffee statistics based on FNC data patterns
    """
    
    # Base data from FNC statistics
    base_production = {
        'annual_projection_2025': 15000,  # thousand bags
        'annual_2024': 13900,  # thousand bags
        'growth_rate': 0.23,  # 23% increase
        'arabica_percentage': 95,
        'coffee_families': 540000,
        'export_value_billions': 4.2
    }
    
    # Generate monthly production data for 2024
    months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
              'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    
    monthly_data = []
    for i, month in enumerate(months):
        # Simulate seasonal patterns (main harvest Apr-Jun, mitaca Oct-Dec)
        if i in [3, 4, 5]:  # Main harvest months
            base_production_month = random.randint(1400, 1600)
        elif i in [9, 10, 11]:  # Mitaca harvest months
            base_production_month = random.randint(1100, 1300)
        else:
            base_production_month = random.randint(800, 1200)
        
        exports = int(base_production_month * random.uniform(0.85, 0.95))
        price = round(random.uniform(175, 195), 2)
        
        monthly_data.append({
            'month': month,
            'month_short': month[:3],
            'production': base_production_month,
            'exports': exports,
            'price_usd_lb': price,
            'quality_premium': round(random.uniform(5, 15), 1)
        })
    
    # Regional production distribution
    regions = [
        {'name': 'Huila', 'percentage': 18.5, 'quality_score': 85},
        {'name': 'Nariño', 'percentage': 16.2, 'quality_score': 87},
        {'name': 'Tolima', 'percentage': 14.8, 'quality_score': 83},
        {'name': 'Cauca', 'percentage': 12.3, 'quality_score': 86},
        {'name': 'Antioquia', 'percentage': 10.1, 'quality_score': 82},
        {'name': 'Valle del Cauca', 'percentage': 8.9, 'quality_score': 84},
        {'name': 'Caldas', 'percentage': 7.8, 'quality_score': 85},
        {'name': 'Risaralda', 'percentage': 6.2, 'quality_score': 86},
        {'name': 'Quindío', 'percentage': 5.2, 'quality_score': 87}
    ]
    
    # Quality classification
    quality_grades = [
        {'grade': 'Supremo', 'percentage': 45, 'price_premium': 12},
        {'grade': 'Extra', 'percentage': 35, 'price_premium': 8},
        {'grade': 'UGQ (Usual Good Quality)', 'percentage': 15, 'price_premium': 0},
        {'grade': 'Otros', 'percentage': 5, 'price_premium': -5}
    ]
    
    # Climate impact factors
    climate_factors = {
        'temperature_optimal_range': [18, 24],  # Celsius
        'rainfall_optimal_mm': [1200, 1800],
        'altitude_optimal_m': [1200, 2000],
        'el_nino_impact': -15,  # percentage reduction
        'la_nina_impact': 10   # percentage increase
    }
    
    # Market projections for 2025
    projections_2025 = {
        'main_harvest': {
            'period': 'Abril-Junio',
            'projected_bags': 9200,
            'confidence': 85
        },
        'mitaca_harvest': {
            'period': 'Octubre-Diciembre',
            'projected_bags': 6800,
            'confidence': 78
        },
        'price_projections': {
            'Q1': {'min': 185, 'max': 195, 'trend': 'alcista'},
            'Q2': {'min': 180, 'max': 190, 'trend': 'estable'},
            'Q3': {'min': 175, 'max': 185, 'trend': 'bajista'},
            'Q4': {'min': 175, 'max': 185, 'trend': 'estable'}
        }
    }
    
    # Risk factors
    risk_factors = [
        {'factor': 'Cambio climático', 'impact_level': 'Alto', 'probability': 0.8},
        {'factor': 'Volatilidad precios internacionales', 'impact_level': 'Medio', 'probability': 0.7},
        {'factor': 'Costos de producción', 'impact_level': 'Medio', 'probability': 0.6},
        {'factor': 'Plagas y enfermedades', 'impact_level': 'Medio', 'probability': 0.5},
        {'factor': 'Disponibilidad mano de obra', 'impact_level': 'Alto', 'probability': 0.7}
    ]
    
    # Opportunities
    opportunities = [
        {'opportunity': 'Cafés especiales', 'growth_potential': 'Alto', 'market_size': 'Creciente'},
        {'opportunity': 'Mercados emergentes', 'growth_potential': 'Medio', 'market_size': 'Grande'},
        {'opportunity': 'Certificaciones sostenibles', 'growth_potential': 'Alto', 'market_size': 'Creciente'},
        {'opportunity': 'Innovación en procesos', 'growth_potential': 'Medio', 'market_size': 'Medio'}
    ]
    
    # Compile all data
    coffee_statistics = {
        'metadata': {
            'generated_date': datetime.now().isoformat(),
            'source': 'Federación Nacional de Cafeteros - Aromadata Analytics',
            'version': '1.0'
        },
        'base_statistics': base_production,
        'monthly_data_2024': monthly_data,
        'regional_distribution': regions,
        'quality_classification': quality_grades,
        'climate_factors': climate_factors,
        'projections_2025': projections_2025,
        'risk_factors': risk_factors,
        'opportunities': opportunities
    }
    
    return coffee_statistics

def export_to_formats(data):
    """
    Export data to different formats (JSON, CSV, Excel)
    """
    
    # Export to JSON
    with open('coffee_statistics.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    # Export monthly data to CSV
    monthly_df = pd.DataFrame(data['monthly_data_2024'])
    monthly_df.to_csv('monthly_production_2024.csv', index=False, encoding='utf-8')
    
    # Export regional data to CSV
    regional_df = pd.DataFrame(data['regional_distribution'])
    regional_df.to_csv('regional_distribution.csv', index=False, encoding='utf-8')
    
    # Export to Excel with multiple sheets
    with pd.ExcelWriter('coffee_statistics_complete.xlsx', engine='openpyxl') as writer:
        monthly_df.to_excel(writer, sheet_name='Producción Mensual', index=False)
        regional_df.to_excel(writer, sheet_name='Distribución Regional', index=False)
        
        quality_df = pd.DataFrame(data['quality_classification'])
        quality_df.to_excel(writer, sheet_name='Clasificación Calidad', index=False)
        
        risk_df = pd.DataFrame(data['risk_factors'])
        risk_df.to_excel(writer, sheet_name='Factores de Riesgo', index=False)
    
    print("✅ Datos exportados exitosamente:")
    print("📄 coffee_statistics.json")
    print("📊 monthly_production_2024.csv")
    print("🗺️ regional_distribution.csv")
    print("📈 coffee_statistics_complete.xlsx")

if __name__ == "__main__":
    print("🚀 Generando estadísticas del café colombiano...")
    
    # Generate statistics
    coffee_data = generate_coffee_statistics()
    
    # Export to different formats
    export_to_formats(coffee_data)
    
    # Display summary
    print("\n📊 RESUMEN DE ESTADÍSTICAS GENERADAS:")
    print(f"📈 Proyección 2025: {coffee_data['base_statistics']['annual_projection_2025']:,} mil sacos")
    print(f"📊 Producción 2024: {coffee_data['base_statistics']['annual_2024']:,} mil sacos")
    print(f"📈 Crecimiento: {coffee_data['base_statistics']['growth_rate']*100:.1f}%")
    print(f"👨‍🌾 Familias cafeteras: {coffee_data['base_statistics']['coffee_families']:,}")
    print(f"💰 Valor exportado: ${coffee_data['base_statistics']['export_value_billions']:.1f}B USD")
    print(f"☕ Café Arábica: {coffee_data['base_statistics']['arabica_percentage']}%")
    
    print(f"\n🗺️ Principales regiones productoras:")
    for region in coffee_data['regional_distribution'][:5]:
        print(f"   • {region['name']}: {region['percentage']}% (Calidad: {region['quality_score']}/100)")
    
    print(f"\n🔮 Proyecciones 2025:")
    print(f"   • Cosecha principal: {coffee_data['projections_2025']['main_harvest']['projected_bags']:,} mil sacos")
    print(f"   • Mitaca: {coffee_data['projections_2025']['mitaca_harvest']['projected_bags']:,} mil sacos")
    print(f"   • Total proyectado: {coffee_data['projections_2025']['main_harvest']['projected_bags'] + coffee_data['projections_2025']['mitaca_harvest']['projected_bags']:,} mil sacos")
