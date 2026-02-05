import 'dotenv/config';
import { db, poolConnection } from './index';
import { users, companies, categories, features, applications, products, productCategories, productFeatures, productApplications, blogPosts } from './schema';
import bcrypt from 'bcryptjs';

async function seed() {
  console.log('🌱 Starting database seed...');

  try {
    // Clear existing data in reverse order of dependencies
    console.log('Clearing existing data...');
    await db.delete(productApplications);
    await db.delete(productFeatures);
    await db.delete(productCategories);
    await db.delete(products);
    await db.delete(blogPosts);
    await db.delete(applications);
    await db.delete(features);
    await db.delete(categories);
    await db.delete(companies);
    await db.delete(users);

    // Seed Admin User
    console.log('Seeding admin user...');
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await db.insert(users).values({
      email: 'admin@shashvattrading.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'admin',
      isActive: true,
    });

    // Seed Editor User
    await db.insert(users).values({
      email: 'editor@shashvattrading.com',
      password: await bcrypt.hash('editor123', 10),
      name: 'Content Editor',
      role: 'editor',
      isActive: true,
    });

    // Seed Companies (Manufacturers)
    console.log('Seeding companies...');
    const companyData = [
      { name: 'LG Chem', description: 'Global chemical company producing a wide range of polymers and plastics.', website: 'https://www.lgchem.com' },
      { name: 'Formosa Plastics', description: 'One of the world\'s largest producers of PVC and polyethylene.', website: 'https://www.fpcusa.com' },
      { name: 'SABIC', description: 'Saudi Basic Industries Corporation - global leader in diversified chemicals.', website: 'https://www.sabic.com' },
      { name: 'Reliance Industries', description: 'India\'s largest producer of polypropylene and polyethylene.', website: 'https://www.ril.com' },
      { name: 'Dow Chemical', description: 'American multinational chemical corporation.', website: 'https://www.dow.com' },
      { name: 'ExxonMobil', description: 'One of the world\'s largest producers of polyethylene and polypropylene.', website: 'https://www.exxonmobil.com' },
      { name: 'BASF', description: 'German multinational chemical company and the largest chemical producer in the world.', website: 'https://www.basf.com' },
      { name: 'Braskem', description: 'Brazilian petrochemical company and the largest producer of thermoplastic resins in the Americas.', website: 'https://www.braskem.com' },
      { name: 'IRPC', description: 'Thailand\'s leading integrated petrochemical company producing POLIMAXX ABS and other polymers.', website: 'https://www.irpc.co.th' },
      { name: 'Trinseo', description: 'Global materials solutions provider specializing in plastics, latex binders, and synthetic rubber.', website: 'https://www.trinseo.com' },
      { name: 'INEOS Styrolution', description: 'The world\'s leading styrenics supplier with a focus on customer-centric innovation.', website: 'https://www.ineos-styrolution.com' },
      { name: 'Chi Mei', description: 'Leading Taiwanese manufacturer of ABS and engineering plastics.', website: 'https://www.chimeicorp.com' },
    ];

    for (const company of companyData) {
      await db.insert(companies).values(company);
    }

    // Seed Categories
    console.log('Seeding categories...');
    const categoryData = [
      { name: 'Polypropylene (PP)', slug: 'polypropylene-pp', description: 'Versatile thermoplastic polymer used in packaging, automotive, and consumer goods.' },
      { name: 'Polyethylene (PE)', slug: 'polyethylene-pe', description: 'Most common plastic, includes LDPE, LLDPE, HDPE variants.' },
      { name: 'PVC', slug: 'pvc', description: 'Polyvinyl chloride for construction, pipes, and flexible applications.' },
      { name: 'ABS Resins', slug: 'abs-resins', description: 'Acrylonitrile butadiene styrene for electronics and automotive.' },
      { name: 'Polystyrene (PS)', slug: 'polystyrene-ps', description: 'Includes GPPS and HIPS for packaging and disposables.' },
      { name: 'Engineering Plastics', slug: 'engineering-plastics', description: 'High-performance plastics including PC, PA, POM, PBT.' },
      { name: 'PET Resins', slug: 'pet-resins', description: 'Polyethylene terephthalate for bottles and packaging.' },
      { name: 'Masterbatch', slug: 'masterbatch', description: 'Concentrated color and additive compounds.' },
      { name: 'LDPE', slug: 'ldpe', description: 'Low-density polyethylene for films and flexible packaging.' },
      { name: 'HDPE', slug: 'hdpe', description: 'High-density polyethylene for rigid containers and pipes.' },
      { name: 'LLDPE', slug: 'lldpe', description: 'Linear low-density polyethylene for stretch films.' },
      { name: 'PC (Polycarbonate)', slug: 'polycarbonate', description: 'High-impact transparent engineering plastic.' },
    ];

    for (const category of categoryData) {
      await db.insert(categories).values(category);
    }

    // Seed Features
    console.log('Seeding features...');
    const featureData = [
      { name: 'High Impact Resistance', slug: 'high-impact-resistance', description: 'Excellent resistance to physical impact and stress.' },
      { name: 'UV Stabilized', slug: 'uv-stabilized', description: 'Protected against ultraviolet radiation damage.' },
      { name: 'Food Grade', slug: 'food-grade', description: 'Safe for food contact applications.' },
      { name: 'Flame Retardant', slug: 'flame-retardant', description: 'Meets fire safety standards and regulations.' },
      { name: 'Chemical Resistant', slug: 'chemical-resistant', description: 'Resistant to various chemicals and solvents.' },
      { name: 'High Clarity', slug: 'high-clarity', description: 'Excellent optical transparency.' },
      { name: 'High Flow', slug: 'high-flow', description: 'Easy processing with high melt flow index.' },
      { name: 'Recyclable', slug: 'recyclable', description: 'Can be recycled after use.' },
      { name: 'Anti-Static', slug: 'anti-static', description: 'Prevents static charge buildup.' },
      { name: 'Weather Resistant', slug: 'weather-resistant', description: 'Suitable for outdoor applications.' },
      { name: 'Heat Resistant', slug: 'heat-resistant', description: 'Maintains properties at elevated temperatures.' },
      { name: 'Low Odor', slug: 'low-odor', description: 'Minimal odor for sensitive applications.' },
    ];

    for (const feature of featureData) {
      await db.insert(features).values(feature);
    }

    // Seed Applications
    console.log('Seeding applications...');
    const applicationData = [
      { name: 'Automotive', slug: 'automotive', description: 'Interior and exterior automotive components.' },
      { name: 'Packaging', slug: 'packaging', description: 'Flexible and rigid packaging solutions.' },
      { name: 'Construction', slug: 'construction', description: 'Building materials and infrastructure.' },
      { name: 'Electronics', slug: 'electronics', description: 'Electronic housings and components.' },
      { name: 'Consumer Goods', slug: 'consumer-goods', description: 'Household items and appliances.' },
      { name: 'Medical', slug: 'medical', description: 'Medical devices and healthcare products.' },
      { name: 'Agriculture', slug: 'agriculture', description: 'Agricultural films and irrigation systems.' },
      { name: 'Textiles', slug: 'textiles', description: 'Fibers and textile applications.' },
      { name: 'Pipes & Fittings', slug: 'pipes-fittings', description: 'Plumbing and industrial piping.' },
      { name: 'Film & Sheet', slug: 'film-sheet', description: 'Films and sheet extrusion applications.' },
      { name: 'Injection Molding', slug: 'injection-molding', description: 'Parts made via injection molding process.' },
      { name: 'Blow Molding', slug: 'blow-molding', description: 'Bottles and hollow containers.' },
    ];

    for (const app of applicationData) {
      await db.insert(applications).values(app);
    }

    // Get inserted IDs
    const insertedCompanies = await db.select().from(companies);
    const insertedCategories = await db.select().from(categories);
    const insertedFeatures = await db.select().from(features);
    const insertedApplications = await db.select().from(applications);

    const getCompanyId = (name: string) => insertedCompanies.find(c => c.name === name)!.id;
    const getCategoryId = (name: string) => insertedCategories.find(c => c.name === name)?.id;
    const getFeatureId = (name: string) => insertedFeatures.find(f => f.name === name)?.id;
    const getApplicationId = (name: string) => insertedApplications.find(a => a.name === name)?.id;

    // Seed Products - 25 products
    console.log('Seeding products...');
    const productData = [
      // PP Products (5)
      { 
        companyId: getCompanyId('LG Chem'), 
        name: 'LUPOL PP H1500', 
        slug: 'lg-chem-lupol-pp-h1500-polypropylene-resin', 
        shortDescription: 'High-flow polypropylene homopolymer for injection molding applications, offering excellent processability and surface finish.',
        contentHtml: `
          <h2>Product Overview</h2>
          <p>LUPOL PP H1500 is a premium high-flow polypropylene homopolymer manufactured by LG Chem, designed specifically for thin-wall injection molding applications. This versatile resin offers an excellent balance of processability, mechanical properties, and surface aesthetics.</p>
          
          <h2>Technical Specifications</h2>
          <table class="spec-table">
            <tr><th>Property</th><th>Value</th><th>Test Method</th></tr>
            <tr><td>Melt Flow Rate (230°C/2.16kg)</td><td>12 g/10min</td><td>ISO 1133</td></tr>
            <tr><td>Density</td><td>0.905 g/cm³</td><td>ISO 1183</td></tr>
            <tr><td>Tensile Strength at Yield</td><td>35 MPa</td><td>ISO 527</td></tr>
            <tr><td>Flexural Modulus</td><td>1,450 MPa</td><td>ISO 178</td></tr>
            <tr><td>Heat Deflection Temperature</td><td>95°C</td><td>ISO 75-2</td></tr>
          </table>
          
          <h2>Key Benefits</h2>
          <ul>
            <li><strong>Excellent Flow Properties:</strong> Enables filling of thin-wall and complex mold geometries</li>
            <li><strong>Superior Surface Quality:</strong> Delivers high gloss and smooth surface finish</li>
            <li><strong>Good Stiffness:</strong> Maintains dimensional stability in end products</li>
            <li><strong>Food Contact Approved:</strong> Complies with FDA and EU food contact regulations</li>
            <li><strong>Consistent Quality:</strong> Tight specifications ensure batch-to-batch consistency</li>
          </ul>
          
          <h2>Recommended Applications</h2>
          <ul>
            <li>Thin-wall food containers and lids</li>
            <li>Disposable cutlery and tableware</li>
            <li>Medical packaging components</li>
            <li>Consumer electronics housings</li>
            <li>Automotive interior trim parts</li>
          </ul>
          
          <h2>Processing Guidelines</h2>
          <p>Recommended processing temperature: 200-240°C. Mold temperature: 20-50°C. Drying is not typically required for this grade.</p>
        `,
        isActive: true, 
        categories: ['Polypropylene (PP)'], 
        features: ['High Flow', 'Food Grade', 'Recyclable'], 
        applications: ['Packaging', 'Consumer Goods', 'Injection Molding'] 
      },
      { 
        companyId: getCompanyId('Reliance Industries'), 
        name: 'Repol PP H030SG', 
        slug: 'reliance-repol-pp-h030sg-polypropylene-resin', 
        shortDescription: 'General purpose polypropylene homopolymer offering versatility for injection molding, extrusion, and fiber applications.',
        contentHtml: `
          <h2>Product Overview</h2>
          <p>Repol PP H030SG from Reliance Industries is a versatile general-purpose polypropylene homopolymer that delivers consistent performance across multiple processing methods including injection molding, extrusion, and fiber spinning.</p>
          
          <h2>Technical Specifications</h2>
          <table class="spec-table">
            <tr><th>Property</th><th>Value</th><th>Test Method</th></tr>
            <tr><td>Melt Flow Rate (230°C/2.16kg)</td><td>3.0 g/10min</td><td>ASTM D1238</td></tr>
            <tr><td>Density</td><td>0.900 g/cm³</td><td>ASTM D1505</td></tr>
            <tr><td>Tensile Strength at Yield</td><td>33 MPa</td><td>ASTM D638</td></tr>
            <tr><td>Flexural Modulus</td><td>1,300 MPa</td><td>ASTM D790</td></tr>
            <tr><td>Notched Izod Impact</td><td>30 J/m</td><td>ASTM D256</td></tr>
          </table>
          
          <h2>Key Benefits</h2>
          <ul>
            <li><strong>Multi-Process Capability:</strong> Suitable for injection molding, extrusion, and fiber production</li>
            <li><strong>Balanced Properties:</strong> Good combination of stiffness, impact resistance, and heat resistance</li>
            <li><strong>Cost-Effective:</strong> Excellent price-performance ratio for high-volume applications</li>
            <li><strong>Food Safe:</strong> Approved for direct food contact applications</li>
          </ul>
          
          <h2>Recommended Applications</h2>
          <ul>
            <li>Woven sacks and bags</li>
            <li>Monofilament and multifilament fibers</li>
            <li>Household containers and caps</li>
            <li>Industrial crates and pallets</li>
            <li>Textile and non-woven fabrics</li>
          </ul>
        `,
        isActive: true, 
        categories: ['Polypropylene (PP)'], 
        features: ['Food Grade', 'Recyclable', 'High Flow'], 
        applications: ['Packaging', 'Textiles', 'Consumer Goods'] 
      },
      { 
        companyId: getCompanyId('SABIC'), 
        name: 'SABIC PP 500P', 
        slug: 'sabic-pp-500p-polypropylene-resin', 
        shortDescription: 'High-stiffness polypropylene homopolymer designed for rigid packaging and demanding automotive applications.',
        contentHtml: `
          <h2>Product Overview</h2>
          <p>SABIC PP 500P is a high-performance polypropylene homopolymer engineered for applications requiring superior stiffness and excellent impact balance. Developed by SABIC's advanced polymer technologies, this grade excels in automotive and rigid packaging sectors.</p>
          
          <h2>Technical Specifications</h2>
          <table class="spec-table">
            <tr><th>Property</th><th>Value</th><th>Test Method</th></tr>
            <tr><td>Melt Flow Rate (230°C/2.16kg)</td><td>5.0 g/10min</td><td>ISO 1133</td></tr>
            <tr><td>Density</td><td>0.905 g/cm³</td><td>ISO 1183</td></tr>
            <tr><td>Tensile Modulus</td><td>1,600 MPa</td><td>ISO 527</td></tr>
            <tr><td>Flexural Modulus</td><td>1,550 MPa</td><td>ISO 178</td></tr>
            <tr><td>HDT at 0.45 MPa</td><td>105°C</td><td>ISO 75-2</td></tr>
          </table>
          
          <h2>Key Benefits</h2>
          <ul>
            <li><strong>Superior Stiffness:</strong> Higher modulus for enhanced structural rigidity</li>
            <li><strong>Heat Resistance:</strong> Elevated HDT for hot-fill and heat-resistant applications</li>
            <li><strong>Chemical Resistance:</strong> Excellent resistance to chemicals and solvents</li>
            <li><strong>Dimensional Stability:</strong> Low warpage and shrinkage for precision molding</li>
          </ul>
          
          <h2>Recommended Applications</h2>
          <ul>
            <li>Automotive interior and exterior components</li>
            <li>Hot-fill food containers</li>
            <li>Industrial containers and bins</li>
            <li>Appliance housings and components</li>
            <li>Furniture components</li>
          </ul>
        `,
        isActive: true, 
        categories: ['Polypropylene (PP)'], 
        features: ['High Impact Resistance', 'Heat Resistant', 'Chemical Resistant'], 
        applications: ['Automotive', 'Packaging', 'Consumer Goods'] 
      },
      { 
        companyId: getCompanyId('ExxonMobil'), 
        name: 'Achieve PP 3854', 
        slug: 'exxonmobil-achieve-pp-3854-polypropylene-resin', 
        shortDescription: 'Impact copolymer PP with exceptional low-temperature impact properties for automotive and appliance applications.',
        contentHtml: `
          <h2>Product Overview</h2>
          <p>Achieve PP 3854 is an advanced impact copolymer polypropylene from ExxonMobil, specifically designed for applications requiring excellent impact resistance at low temperatures. This grade is ideal for automotive and appliance components.</p>
          
          <h2>Technical Specifications</h2>
          <table class="spec-table">
            <tr><th>Property</th><th>Value</th><th>Test Method</th></tr>
            <tr><td>Melt Flow Rate (230°C/2.16kg)</td><td>8.5 g/10min</td><td>ASTM D1238</td></tr>
            <tr><td>Density</td><td>0.900 g/cm³</td><td>ASTM D792</td></tr>
            <tr><td>Notched Izod Impact at 23°C</td><td>450 J/m</td><td>ASTM D256</td></tr>
            <tr><td>Notched Izod Impact at -20°C</td><td>100 J/m</td><td>ASTM D256</td></tr>
            <tr><td>Flexural Modulus</td><td>1,100 MPa</td><td>ASTM D790</td></tr>
          </table>
          
          <h2>Key Benefits</h2>
          <ul>
            <li><strong>Excellent Low-Temp Impact:</strong> Maintains ductile behavior at sub-zero temperatures</li>
            <li><strong>Good Flow:</strong> Easy processing for complex part geometries</li>
            <li><strong>Weathering Resistance:</strong> UV stabilized grades available</li>
            <li><strong>Paintable:</strong> Excellent adhesion with standard automotive coatings</li>
          </ul>
          
          <h2>Recommended Applications</h2>
          <ul>
            <li>Automotive bumpers and fascias</li>
            <li>Interior trim panels</li>
            <li>Appliance components</li>
            <li>Power tool housings</li>
            <li>Outdoor furniture</li>
          </ul>
        `,
        isActive: true, 
        categories: ['Polypropylene (PP)'], 
        features: ['High Impact Resistance', 'Weather Resistant', 'Recyclable'], 
        applications: ['Automotive', 'Consumer Goods', 'Injection Molding'] 
      },
      { 
        companyId: getCompanyId('Braskem'), 
        name: 'Braskem PP CP442XP', 
        slug: 'braskem-pp-cp442xp-polypropylene-resin', 
        shortDescription: 'Random copolymer PP offering exceptional optical clarity for transparent food packaging applications.',
        contentHtml: `
          <h2>Product Overview</h2>
          <p>Braskem PP CP442XP is a premium random copolymer polypropylene that combines excellent clarity with good impact resistance. This grade is specifically designed for transparent packaging where visual appeal and product visibility are paramount.</p>
          
          <h2>Technical Specifications</h2>
          <table class="spec-table">
            <tr><th>Property</th><th>Value</th><th>Test Method</th></tr>
            <tr><td>Melt Flow Rate (230°C/2.16kg)</td><td>25 g/10min</td><td>ASTM D1238</td></tr>
            <tr><td>Haze</td><td>< 5%</td><td>ASTM D1003</td></tr>
            <tr><td>Gloss (60°)</td><td>> 95%</td><td>ASTM D2457</td></tr>
            <tr><td>Flexural Modulus</td><td>950 MPa</td><td>ASTM D790</td></tr>
            <tr><td>Notched Izod Impact</td><td>50 J/m</td><td>ASTM D256</td></tr>
          </table>
          
          <h2>Key Benefits</h2>
          <ul>
            <li><strong>Crystal Clear:</strong> Excellent optical properties with very low haze</li>
            <li><strong>Food Contact Approved:</strong> Compliant with FDA and major food safety regulations</li>
            <li><strong>Improved Impact:</strong> Better impact resistance than homopolymer PP</li>
            <li><strong>Good Sealability:</strong> Lower sealing temperatures for efficient packaging</li>
          </ul>
          
          <h2>Recommended Applications</h2>
          <ul>
            <li>Clear food containers and lids</li>
            <li>Medical and pharmaceutical packaging</li>
            <li>Cosmetic packaging</li>
            <li>Clear sheets and films</li>
            <li>Display packaging</li>
          </ul>
        `,
        isActive: true, 
        categories: ['Polypropylene (PP)'], 
        features: ['High Clarity', 'Food Grade', 'Recyclable'], 
        applications: ['Packaging', 'Consumer Goods'] 
      },
      // PE/HDPE/LDPE/LLDPE Products (7)
      { 
        companyId: getCompanyId('Formosa Plastics'), 
        name: 'Formolene HDPE 5502', 
        slug: 'formosa-formolene-hdpe-5502-polyethylene-resin', 
        shortDescription: 'High-density polyethylene designed for blow molding of containers, bottles, and drums with excellent ESCR.',
        contentHtml: `
          <h2>Product Overview</h2>
          <p>Formolene HDPE 5502 from Formosa Plastics is a high-density polyethylene resin specifically engineered for extrusion blow molding applications. This grade offers an excellent balance of processability, environmental stress crack resistance (ESCR), and mechanical properties.</p>
          
          <h2>Technical Specifications</h2>
          <table class="spec-table">
            <tr><th>Property</th><th>Value</th><th>Test Method</th></tr>
            <tr><td>Density</td><td>0.955 g/cm³</td><td>ASTM D1505</td></tr>
            <tr><td>Melt Index (190°C/2.16kg)</td><td>0.35 g/10min</td><td>ASTM D1238</td></tr>
            <tr><td>ESCR (F50)</td><td>> 1000 hrs</td><td>ASTM D1693</td></tr>
            <tr><td>Tensile Strength at Yield</td><td>28 MPa</td><td>ASTM D638</td></tr>
            <tr><td>Flexural Modulus</td><td>1,100 MPa</td><td>ASTM D790</td></tr>
          </table>
          
          <h2>Key Benefits</h2>
          <ul>
            <li><strong>Outstanding ESCR:</strong> Excellent resistance to environmental stress cracking</li>
            <li><strong>High Stiffness:</strong> Good top load strength for stacking performance</li>
            <li><strong>Chemical Resistance:</strong> Compatible with wide range of household and industrial chemicals</li>
            <li><strong>Good Processability:</strong> Stable parison with excellent melt strength</li>
          </ul>
          
          <h2>Recommended Applications</h2>
          <ul>
            <li>Household chemical bottles (detergents, cleaners)</li>
            <li>Industrial containers and drums</li>
            <li>Personal care bottles</li>
            <li>Automotive fluid containers</li>
            <li>Agricultural chemical containers</li>
          </ul>
          
          <h2>Processing Guidelines</h2>
          <p>Recommended barrel temperature: 180-220°C. Head/die temperature: 190-210°C. Pre-drying not required.</p>
        `,
        isActive: true, 
        categories: ['Polyethylene (PE)', 'HDPE'], 
        features: ['Chemical Resistant', 'High Impact Resistance', 'Recyclable'], 
        applications: ['Packaging', 'Consumer Goods', 'Blow Molding'] 
      },
      { companyId: getCompanyId('SABIC'), name: 'SABIC LLDPE 118W', slug: 'sabic-lldpe-118w-polyethylene-resin', shortDescription: 'Linear low-density polyethylene for high-performance films.', contentHtml: '<h2>Product Overview</h2><p>SABIC LLDPE 118W is a butene-based linear low-density polyethylene designed for film extrusion, offering excellent dart impact and tear resistance.</p><h2>Technical Specifications</h2><table class="spec-table"><tr><th>Property</th><th>Value</th></tr><tr><td>Density</td><td>0.918 g/cm³</td></tr><tr><td>Melt Index</td><td>1.0 g/10min</td></tr><tr><td>Dart Impact</td><td>800 g</td></tr></table><h2>Applications</h2><ul><li>Stretch films</li><li>Agricultural films</li><li>Heavy-duty bags</li></ul>', isActive: true, categories: ['Polyethylene (PE)', 'LLDPE'], features: ['High Clarity', 'Recyclable', 'Food Grade'], applications: ['Film & Sheet', 'Packaging', 'Agriculture'] },
      { companyId: getCompanyId('Dow Chemical'), name: 'DOWLEX 2045G', slug: 'dow-dowlex-2045g-polyethylene-resin', shortDescription: 'Premium octene-based LLDPE resin for heavy-duty bags and industrial packaging requiring superior toughness.', contentHtml: '<h2>Product Overview</h2><p>DOWLEX 2045G is an octene-based LLDPE designed for demanding packaging applications requiring exceptional toughness and puncture resistance.</p><h2>Technical Specifications</h2><table class="spec-table"><tr><th>Property</th><th>Value</th></tr><tr><td>Density</td><td>0.920 g/cm³</td></tr><tr><td>Melt Index</td><td>1.0 g/10min</td></tr><tr><td>Tensile Strength</td><td>14 MPa</td></tr></table><h2>Applications</h2><ul><li>Heavy-duty shipping bags</li><li>Industrial liners</li><li>Lamination films</li></ul>', isActive: true, categories: ['Polyethylene (PE)', 'LLDPE'], features: ['High Impact Resistance', 'Recyclable', 'Chemical Resistant'], applications: ['Packaging', 'Agriculture', 'Film & Sheet'] },
      { companyId: getCompanyId('ExxonMobil'), name: 'Exceed XP 8656', slug: 'exxonmobil-exceed-xp-8656-polyethylene-resin', shortDescription: 'Metallocene-catalyzed PE delivering exceptional clarity, toughness, and sealability for demanding film applications.', contentHtml: '<h2>Product Overview</h2><p>Exceed XP 8656 is a metallocene polyethylene offering superior performance in clarity-critical applications with excellent seal integrity.</p><h2>Key Benefits</h2><ul><li>Crystal clear optical properties</li><li>Low seal initiation temperature</li><li>Excellent hot tack</li><li>Superior toughness</li></ul>', isActive: true, categories: ['Polyethylene (PE)', 'LLDPE'], features: ['High Clarity', 'Recyclable', 'Food Grade'], applications: ['Film & Sheet', 'Packaging'] },
      { companyId: getCompanyId('Reliance Industries'), name: 'Relene HDPE M60075', slug: 'reliance-relene-hdpe-m60075-polyethylene-resin', shortDescription: 'HDPE designed for pressure pipe applications with excellent long-term hydrostatic strength and crack resistance.', contentHtml: '<h2>Product Overview</h2><p>Relene HDPE M60075 is engineered for PE100 pressure pipe applications, offering superior long-term performance and resistance to slow crack growth.</p><h2>Technical Specifications</h2><table class="spec-table"><tr><th>Property</th><th>Value</th></tr><tr><td>MRS</td><td>10.0 MPa (PE100)</td></tr><tr><td>Density</td><td>0.959 g/cm³</td></tr><tr><td>Carbon Black</td><td>2-2.5%</td></tr></table><h2>Applications</h2><ul><li>Water distribution pipes</li><li>Gas distribution pipes</li><li>Industrial piping</li></ul>', isActive: true, categories: ['Polyethylene (PE)', 'HDPE'], features: ['Chemical Resistant', 'UV Stabilized', 'Weather Resistant'], applications: ['Pipes & Fittings', 'Construction'] },
      { companyId: getCompanyId('Braskem'), name: 'Braskem LDPE PB608', slug: 'braskem-ldpe-pb608-polyethylene-resin', shortDescription: 'LDPE resin offering excellent processability and optical properties for general purpose film applications.', contentHtml: '<h2>Product Overview</h2><p>Braskem LDPE PB608 provides excellent processability for blown and cast film extrusion with good optical properties.</p><h2>Applications</h2><ul><li>Shrink films</li><li>Lamination</li><li>General packaging films</li></ul>', isActive: true, categories: ['Polyethylene (PE)', 'LDPE'], features: ['High Clarity', 'Food Grade', 'Recyclable'], applications: ['Film & Sheet', 'Packaging'] },
      { companyId: getCompanyId('Dow Chemical'), name: 'DOW LDPE 722', slug: 'dow-ldpe-722-polyethylene-resin', shortDescription: 'Versatile LDPE for packaging film and extrusion coating applications with excellent clarity and seal strength.', contentHtml: '<h2>Product Overview</h2><p>DOW LDPE 722 is a versatile low-density polyethylene suitable for film extrusion and coating applications.</p><h2>Key Features</h2><ul><li>Good clarity and gloss</li><li>Excellent heat seal performance</li><li>FDA compliant</li></ul>', isActive: true, categories: ['Polyethylene (PE)', 'LDPE'], features: ['Food Grade', 'High Clarity', 'Recyclable'], applications: ['Packaging', 'Film & Sheet'] },
      // ABS Products (4)
      { companyId: getCompanyId('LG Chem'), name: 'LUPOY ABS GP-2200', slug: 'lg-chem-lupoy-abs-gp-2200-resin', shortDescription: 'General purpose ABS resin with excellent surface quality and impact resistance for electronics and automotive.', contentHtml: '<h2>Product Overview</h2><p>LUPOY ABS GP-2200 is a general purpose grade ABS resin offering an excellent balance of surface aesthetics, impact strength, and processability.</p><h2>Technical Specifications</h2><table class="spec-table"><tr><th>Property</th><th>Value</th></tr><tr><td>Melt Flow Rate</td><td>21 g/10min</td></tr><tr><td>Notched Izod Impact</td><td>200 J/m</td></tr><tr><td>HDT</td><td>98°C</td></tr></table><h2>Applications</h2><ul><li>TV and monitor housings</li><li>Computer peripherals</li><li>Automotive interior parts</li><li>Appliance housings</li></ul>', isActive: true, categories: ['ABS Resins'], features: ['High Impact Resistance', 'High Clarity'], applications: ['Electronics', 'Consumer Goods', 'Automotive'] },
      { companyId: getCompanyId('Chi Mei'), name: 'Chi Mei Polylac PA-757', slug: 'chi-mei-polylac-pa-757-abs-resin', shortDescription: 'High-gloss ABS for consumer electronics and appliances with superior surface finish and gloss retention.', contentHtml: '<h2>Product Overview</h2><p>Polylac PA-757 offers superior surface finish and high gloss retention ideal for visible parts in electronics and appliances.</p>', isActive: true, categories: ['ABS Resins'], features: ['High Impact Resistance', 'High Clarity', 'Anti-Static'], applications: ['Electronics', 'Consumer Goods', 'Injection Molding'] },
      { companyId: getCompanyId('INEOS Styrolution'), name: 'Terluran GP-22', slug: 'ineos-terluran-gp-22-abs-resin', shortDescription: 'Multi-purpose ABS with excellent balance of mechanical properties and processability for injection molding.', contentHtml: '<h2>Product Overview</h2><p>Terluran GP-22 provides excellent balance of mechanical properties and processability for general injection molding applications.</p>', isActive: true, categories: ['ABS Resins'], features: ['High Impact Resistance', 'Recyclable'], applications: ['Consumer Goods', 'Automotive', 'Electronics'] },
      { companyId: getCompanyId('IRPC'), name: 'POLIMAXX ABS 320', slug: 'irpc-polimaxx-abs-320-resin', shortDescription: 'High-impact ABS designed for demanding automotive interior components with heat and UV resistance.', contentHtml: '<h2>Product Overview</h2><p>POLIMAXX ABS 320 is designed for demanding automotive applications requiring high impact strength and thermal stability.</p>', isActive: true, categories: ['ABS Resins'], features: ['High Impact Resistance', 'Heat Resistant', 'UV Stabilized'], applications: ['Automotive', 'Consumer Goods'] },
      // PVC Products (2)
      { companyId: getCompanyId('Braskem'), name: 'Braskem PVC S67', slug: 'braskem-pvc-s67-resin', shortDescription: 'Suspension PVC resin designed for rigid pipe and profile extrusion with excellent weathering performance.', contentHtml: '<h2>Product Overview</h2><p>Braskem PVC S67 is designed for rigid applications including pipes, profiles, and fittings with excellent long-term weathering performance.</p>', isActive: true, categories: ['PVC'], features: ['Flame Retardant', 'Chemical Resistant', 'Weather Resistant'], applications: ['Construction', 'Pipes & Fittings'] },
      { companyId: getCompanyId('Formosa Plastics'), name: 'Formosa PVC 6650', slug: 'formosa-pvc-6650-resin', shortDescription: 'General purpose PVC for flexible applications offering excellent processability and compound compatibility.', contentHtml: '<h2>Product Overview</h2><p>Formosa PVC 6650 offers excellent processability for flexible PVC compounds in various consumer and medical applications.</p>', isActive: true, categories: ['PVC'], features: ['Flame Retardant', 'Chemical Resistant'], applications: ['Consumer Goods', 'Medical'] },
      // Polystyrene Products (3)
      { companyId: getCompanyId('Formosa Plastics'), name: 'Formosa GPPS 535N', slug: 'formosa-gpps-535n-polystyrene-resin', shortDescription: 'Crystal-clear general purpose polystyrene for transparent packaging and disposables with FDA approval.', contentHtml: '<h2>Product Overview</h2><p>Formosa GPPS 535N is a crystal-clear general purpose polystyrene ideal for food packaging applications requiring excellent optical clarity.</p>', isActive: true, categories: ['Polystyrene (PS)'], features: ['High Clarity', 'Food Grade', 'Recyclable'], applications: ['Packaging', 'Consumer Goods', 'Medical'] },
      { companyId: getCompanyId('INEOS Styrolution'), name: 'Styrolution HIPS 486N', slug: 'ineos-styrolution-hips-486n-polystyrene-resin', shortDescription: 'High-impact polystyrene for refrigerator linings and packaging requiring excellent impact strength.', contentHtml: '<h2>Product Overview</h2><p>HIPS 486N offers excellent impact strength for demanding applications including appliance linings and food packaging.</p>', isActive: true, categories: ['Polystyrene (PS)'], features: ['High Impact Resistance', 'Food Grade', 'Recyclable'], applications: ['Consumer Goods', 'Packaging', 'Electronics'] },
      { companyId: getCompanyId('Trinseo'), name: 'Styron 678E', slug: 'trinseo-styron-678e-polystyrene-resin', shortDescription: 'Crystal polystyrene with exceptional optical clarity for demanding applications.', contentHtml: '<h2>Product Overview</h2><p>Styron 678E provides exceptional clarity and low haze for demanding optical applications.</p>', isActive: true, categories: ['Polystyrene (PS)'], features: ['High Clarity', 'Food Grade', 'Low Odor'], applications: ['Packaging', 'Consumer Goods'] },
      // Engineering Plastics (4)
      { companyId: getCompanyId('BASF'), name: 'Ultramid B3WG6', slug: 'basf-ultramid-b3wg6-polyamide-resin', shortDescription: '30% glass fiber reinforced polyamide 6 for high-strength structural automotive and industrial parts.', contentHtml: '<h2>Product Overview</h2><p>Ultramid B3WG6 is a 30% glass fiber reinforced PA6 offering high strength, stiffness, and excellent dimensional stability for demanding structural applications.</p><h2>Technical Specifications</h2><table class="spec-table"><tr><th>Property</th><th>Value</th></tr><tr><td>Glass Fiber Content</td><td>30%</td></tr><tr><td>Tensile Strength</td><td>185 MPa</td></tr><tr><td>Flexural Modulus</td><td>9,500 MPa</td></tr><tr><td>HDT at 1.8 MPa</td><td>200°C</td></tr></table>', isActive: true, categories: ['Engineering Plastics'], features: ['High Impact Resistance', 'Chemical Resistant', 'Flame Retardant', 'Heat Resistant'], applications: ['Automotive', 'Electronics'] },
      { companyId: getCompanyId('SABIC'), name: 'LEXAN 141R', slug: 'sabic-lexan-141r-polycarbonate-resin', shortDescription: 'General purpose polycarbonate offering exceptional impact strength and optical clarity for transparent applications.', contentHtml: '<h2>Product Overview</h2><p>LEXAN 141R is a versatile polycarbonate resin offering the industry-leading combination of impact strength, optical clarity, and heat resistance.</p><h2>Key Benefits</h2><ul><li>Outstanding impact resistance - virtually unbreakable</li><li>Excellent optical clarity and light transmission</li><li>Wide processing window</li><li>Good heat resistance</li></ul><h2>Applications</h2><ul><li>Safety glazing and shields</li><li>Optical media</li><li>Lighting lenses</li><li>Automotive components</li></ul>', isActive: true, categories: ['Engineering Plastics', 'PC (Polycarbonate)'], features: ['High Impact Resistance', 'High Clarity', 'Flame Retardant'], applications: ['Electronics', 'Automotive', 'Consumer Goods'] },
      { companyId: getCompanyId('BASF'), name: 'Ultradur B4520', slug: 'basf-ultradur-b4520-pbt-resin', shortDescription: 'PBT polyester for electrical connectors and automotive parts requiring excellent dimensional stability.', contentHtml: '<h2>Product Overview</h2><p>Ultradur B4520 is an unreinforced PBT polyester offering excellent dimensional stability, electrical insulation properties, and chemical resistance.</p><h2>Key Benefits</h2><ul><li>Excellent dimensional stability</li><li>Outstanding electrical insulation</li><li>Good chemical resistance</li><li>Fast crystallization for short cycle times</li></ul>', isActive: true, categories: ['Engineering Plastics'], features: ['Chemical Resistant', 'Heat Resistant', 'Flame Retardant'], applications: ['Electronics', 'Automotive'] },
      { companyId: getCompanyId('LG Chem'), name: 'LUPOX GP-1100', slug: 'lg-chem-lupox-gp-1100-pbt-resin', shortDescription: 'General purpose PBT for injection molding with excellent mechanical properties and fast molding cycles.', contentHtml: '<h2>Product Overview</h2><p>LUPOX GP-1100 provides excellent mechanical properties, fast molding cycles, and good surface aesthetics for general purpose engineering applications.</p>', isActive: true, categories: ['Engineering Plastics'], features: ['Heat Resistant', 'Chemical Resistant', 'Recyclable'], applications: ['Electronics', 'Consumer Goods', 'Injection Molding'] },
      // PET Products (2)
      { companyId: getCompanyId('Reliance Industries'), name: 'Relpet G5801', slug: 'reliance-relpet-g5801-pet-resin', shortDescription: 'Bottle-grade PET specifically designed for carbonated soft drink containers with excellent clarity and gas barrier.', contentHtml: '<h2>Product Overview</h2><p>Relpet G5801 is a high-quality bottle-grade PET resin designed for carbonated soft drink (CSD) applications, offering excellent clarity, gas barrier properties, and processing stability.</p><h2>Technical Specifications</h2><table class="spec-table"><tr><th>Property</th><th>Value</th></tr><tr><td>Intrinsic Viscosity</td><td>0.80 dl/g</td></tr><tr><td>Acetaldehyde</td><td>< 1.0 ppm</td></tr><tr><td>DEG Content</td><td>1.3%</td></tr></table>', isActive: true, categories: ['PET Resins'], features: ['High Clarity', 'Food Grade', 'Recyclable'], applications: ['Packaging', 'Blow Molding'] },
      { companyId: getCompanyId('Formosa Plastics'), name: 'Formosa PET CR-8863', slug: 'formosa-pet-cr-8863-resin', shortDescription: 'High-IV PET resin for large container and industrial applications requiring superior mechanical properties.', contentHtml: '<h2>Product Overview</h2><p>Formosa PET CR-8863 offers excellent mechanical properties for large containers and industrial applications, featuring high intrinsic viscosity for demanding stretch blow molding processes.</p>', isActive: true, categories: ['PET Resins'], features: ['High Clarity', 'Food Grade', 'Recyclable', 'Chemical Resistant'], applications: ['Packaging', 'Blow Molding', 'Consumer Goods'] },
    ];

    for (const product of productData) {
      const { categories: cats, features: feats, applications: apps, ...productInfo } = product;
      
      const [result] = await db.insert(products).values({
        ...productInfo,
        seoTitle: `${productInfo.name} - Premium Plastic Resin | Shashvat Trading`,
        seoDescription: productInfo.shortDescription,
      });
      const productId = result.insertId;

      // Add categories
      for (const catName of cats) {
        const catId = getCategoryId(catName);
        if (catId) await db.insert(productCategories).values({ productId, categoryId: catId });
      }

      // Add features
      for (const featName of feats) {
        const featId = getFeatureId(featName);
        if (featId) await db.insert(productFeatures).values({ productId, featureId: featId });
      }

      // Add applications
      for (const appName of apps) {
        const appId = getApplicationId(appName);
        if (appId) await db.insert(productApplications).values({ productId, applicationId: appId });
      }
    }

    // Seed Blog Posts
    console.log('Seeding blog posts...');
    const blogData = [
      { title: 'Understanding Different Types of Polyethylene: LDPE, LLDPE, and HDPE', slug: 'understanding-polyethylene-types', excerpt: 'A comprehensive guide to the different types of polyethylene and their applications in various industries.', contentHtml: '<h2>Introduction to Polyethylene</h2><p>Polyethylene (PE) is the most widely produced plastic in the world.</p>', seoTitle: 'Understanding LDPE, LLDPE, and HDPE | Shashvat Trading', seoDescription: 'Learn about the differences between LDPE, LLDPE, and HDPE polyethylene.', isPublished: true, publishedAt: new Date('2025-01-15') },
      { title: 'Sustainable Plastics: The Future of Polymer Industry', slug: 'sustainable-plastics-future', excerpt: 'Exploring eco-friendly alternatives and recycling innovations in the plastics industry.', contentHtml: '<h2>The Shift Towards Sustainability</h2><p>The plastics industry is undergoing a significant transformation.</p>', seoTitle: 'Sustainable Plastics & Recycling | Shashvat Trading', seoDescription: 'Explore the future of sustainable plastics.', isPublished: true, publishedAt: new Date('2025-01-10') },
      { title: 'Guide to Selecting the Right Polypropylene Grade', slug: 'polypropylene-grade-selection-guide', excerpt: 'How to choose between PP homopolymer, random copolymer, and impact copolymer.', contentHtml: '<h2>Polypropylene Variants</h2><p>Polypropylene (PP) is available in three main variants.</p>', seoTitle: 'Polypropylene Grade Selection Guide | Shashvat Trading', seoDescription: 'Learn how to select the right polypropylene grade.', isPublished: true, publishedAt: new Date('2025-01-05') },
      { title: 'Engineering Plastics: When Standard Polymers Won\'t Do', slug: 'engineering-plastics-guide', excerpt: 'An overview of high-performance engineering plastics and their demanding applications.', contentHtml: '<h2>Beyond Commodity Plastics</h2><p>Engineering plastics offer superior properties.</p>', seoTitle: 'Engineering Plastics Guide | Shashvat Trading', seoDescription: 'Discover high-performance engineering plastics.', isPublished: true, publishedAt: new Date('2024-12-28') },
      { title: 'Global Polymer Market Trends for 2025', slug: 'polymer-market-trends-2025', excerpt: 'Key trends and predictions shaping the global plastics and polymer industry in 2025.', contentHtml: '<h2>Market Overview</h2><p>The global polymer market continues to evolve.</p>', seoTitle: 'Polymer Market Trends 2025 | Shashvat Trading', seoDescription: 'Key trends for the global polymer market in 2025.', isPublished: true, publishedAt: new Date('2024-12-20') },
      { title: 'ABS vs. Polycarbonate: Choosing the Right Material', slug: 'abs-vs-polycarbonate-comparison', excerpt: 'A detailed comparison of ABS and polycarbonate plastics.', contentHtml: '<h2>Material Comparison</h2><p>Both ABS and PC are popular engineering plastics.</p>', seoTitle: 'ABS vs Polycarbonate Comparison | Shashvat Trading', seoDescription: 'Compare ABS and polycarbonate plastics.', isPublished: true, publishedAt: new Date('2024-12-15') },
    ];

    for (const blog of blogData) {
      await db.insert(blogPosts).values(blog);
    }

    console.log('✅ Database seeded successfully!');
    console.log(`
Summary:
- 2 admin users created (admin@shashvattrading.com / admin123, editor@shashvattrading.com / editor123)
- ${companyData.length} companies created
- ${categoryData.length} categories created
- ${featureData.length} features created
- ${applicationData.length} applications created
- ${productData.length} products created (with relationships)
- ${blogData.length} blog posts created
    `);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    await poolConnection.end();
  }
}

seed();
