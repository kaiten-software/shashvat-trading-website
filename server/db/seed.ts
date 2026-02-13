import 'dotenv/config';
import { db, poolConnection } from './index';
import { users, companies, categories, features, applications, products, productCategories, productFeatures, productApplications, blogPosts, productDocuments, productImages, inquiries, callbackRequests } from './schema';
import bcrypt from 'bcryptjs';

async function seed() {
  console.log('🌱 Starting database seed...');

  try {
    // Clear existing data in reverse order of dependencies
    console.log('Clearing existing data...');
    await db.delete(productDocuments);
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
      { name: 'ABS Resins', slug: 'abs-products', description: 'Acrylonitrile butadiene styrene for electronics and automotive.' },
      { name: 'Polystyrene (PS)', slug: 'polystyrene-ps', description: 'Includes GPPS and HIPS for packaging and disposables.' },
      { name: 'Engineering Plastics', slug: 'engineering-plastics', description: 'High-performance plastics including PC, PA, POM, PBT.' },
      { name: 'PET Resins', slug: 'pet-products', description: 'Polyethylene terephthalate for bottles and packaging.' },
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
        slug: 'lg-chem-lupol-pp-h1500',
        heroImage: 'https://images.unsplash.com/photo-1563200155-2ea07c088c22?auto=format&fit=crop&q=80&w=600',
        shortDescription: 'High-flow polypropylene homopolymer for injection molding applications, offering excellent processability and surface finish.',
        seoTitle: 'LUPOL PP H1500 – Polypropylene Homopolymer | Shashvat Trading',
        seoDescription: 'Premium high-flow polypropylene homopolymer designed for thin-wall injection molding. Offers excellent processability, high gloss, and superior surface finish.',
        contentHtml: `
          <div class="product-wrapper">
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Product Overview</h2>
              <p style="color: #374151; line-height: 1.7;">
                <strong style="color: #1f2937;">LUPOL PP H1500</strong> is a premium high-flow polypropylene homopolymer manufactured by LG Chem, designed specifically for thin-wall injection molding applications. This versatile resin offers an excellent balance of processability, mechanical performance, and surface aesthetics.
              </p>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Technical Specifications</h2>
              <div class="table-responsive">
                <table class="spec-table" style="width: 100%; border-collapse: collapse;">
                  <thead>
                    <tr style="background-color: #f1f5f9;">
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Property</th>
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Value</th>
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Test Method</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style="background-color: #ffffff;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Melt Flow Rate (230°C / 2.16kg)</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">12 g/10min</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ISO 1133</td>
                    </tr>
                    <tr style="background-color: #f9fafb;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Density</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">0.905 g/cm³</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ISO 1183</td>
                    </tr>
                    <tr style="background-color: #ffffff;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Tensile Strength at Yield</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">35 MPa</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ISO 527</td>
                    </tr>
                    <tr style="background-color: #f9fafb;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Flexural Modulus</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">1,450 MPa</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ISO 178</td>
                    </tr>
                    <tr style="background-color: #ffffff;">
                      <td style="padding: 10px; color: #374151;">Heat Deflection Temperature</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600;">95°C</td>
                      <td style="padding: 10px; color: #6b7280;">ISO 75-2</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Key Benefits</h2>
              <ul style="list-style: none; padding-left: 0;">
                <li style="padding: 10px 0; border-left: 3px solid #e5e7eb; padding-left: 16px; margin-bottom: 8px;">
                  <strong style="color: #1e40af;">Excellent Flow Properties</strong><br>
                  <span style="color: #374151;">Ideal for thin-wall and complex mold designs</span>
                </li>
                <li style="padding: 10px 0; border-left: 3px solid #e5e7eb; padding-left: 16px; margin-bottom: 8px;">
                  <strong style="color: #1e40af;">Superior Surface Quality</strong><br>
                  <span style="color: #374151;">High gloss and smooth finish</span>
                </li>on } from './index';
import { users, companies, categories, features, applications, products, productCategories, productFeatures, productApplications, blogPosts, productDocuments } from './schema';
import bcrypt from 'bcryptjs';

async function seed() {
  console.log('🌱 Starting database seed...');

  try {
    // Clear existing data in reverse order of dependencies
    console.log('Clearing existing data...');
    await db.delete(productDocuments);
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
      { name: 'ABS Resins', slug: 'abs-products', description: 'Acrylonitrile butadiene styrene for electronics and automotive.' },
      { name: 'Polystyrene (PS)', slug: 'polystyrene-ps', description: 'Includes GPPS and HIPS for packaging and disposables.' },
      { name: 'Engineering Plastics', slug: 'engineering-plastics', description: 'High-performance plastics including PC, PA, POM, PBT.' },
      { name: 'PET Resins', slug: 'pet-products', description: 'Polyethylene terephthalate for bottles and packaging.' },
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
    const getApplicationId = (name: string) => inserte
                <li style="padding: 10px 0; border-left: 3px solid #e5e7eb; padding-left: 16px; margin-bottom: 8px;">
                  <strong style="color: #1e40af;">Good Stiffness</strong><br>
                  <span style="color: #374151;">Ensures dimensional stability</span>
                </li>
                <li style="padding: 10px 0; border-left: 3px solid #e5e7eb; padding-left: 16px; margin-bottom: 8px;">
                  <strong style="color: #1e40af;">Food Contact Approved</strong><br>
                  <span style="color: #374151;">Complies with FDA & EU regulations</span>
                </li>
                <li style="padding: 10px 0; border-left: 3px solid #e5e7eb; padding-left: 16px;">
                  <strong style="color: #1e40af;">Consistent Quality</strong><br>
                  <span style="color: #374151;">Tight batch-to-batch control</span>
                </li>
              </ul>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Recommended Applications</h2>
              <ul style="color: #374151; line-height: 1.8;">
                <li style="padding: 4px 0;">Thin-wall food containers & lids</li>
                <li style="padding: 4px 0;">Disposable cutlery & tableware</li>
                <li style="padding: 4px 0;">Medical packaging components</li>
                <li style="padding: 4px 0;">Consumer electronics housings</li>
                <li style="padding: 4px 0;">Automotive interior trim parts</li>
              </ul>
            </div>
          
            <div class="highlight">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Processing Guidelines</h2>
              <p style="color: #374151; line-height: 1.7; background-color: #f0f9ff; padding: 16px; border-left: 4px solid #3b82f6;">
                Recommended processing temperature: <strong style="color: #1e40af;">200–240°C</strong><br>
                Mold temperature: <strong style="color: #1e40af;">20–50°C</strong><br>
                Drying is not typically required for this grade.
              </p>
            </div>
          </div>
        `,
        isActive: true,
        categories: ['Polypropylene (PP)'],
        features: ['High Flow', 'Food Grade', 'Recyclable'],
        applications: ['Packaging', 'Consumer Goods', 'Injection Molding']
      },
      {
        companyId: getCompanyId('Reliance Industries'),
        name: 'Repol PP H030SG',
        slug: 'reliance-repol-pp-h030sg',
        shortDescription: 'General purpose polypropylene homopolymer offering versatility for injection molding, extrusion, and fiber applications.',
        seoTitle: 'Repol PP H030SG – Polypropylene Homopolymer | Shashvat Trading',
        seoDescription: 'Versatile polypropylene homopolymer for raffia, injection molding, and textile applications. Offers consistent processing, good stiffness, and broad application suitability.',
        contentHtml: `
          <div class="product-wrapper">
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Product Overview</h2>
              <p style="color: #374151; line-height: 1.7;"><strong style="color: #1f2937;">Repol PP H030SG</strong> is a versatile general-purpose polypropylene homopolymer manufactured by Reliance Industries. Engineered for consistency, it delivers reliable performance across raffia, heavy-duty injection molding, and textile applications, making it an industry standard for cost-effective manufacturing.
              </p>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Technical Specifications</h2>
              <div class="table-responsive">
                <table class="spec-table" style="width: 100%; border-collapse: collapse;">
                  <thead>
                    <tr style="background-color: #f1f5f9;">
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Property</th>
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Value</th>
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Test Method</th>
                    </tr>
                  </thead>
                  <tbody>
                  <tr style="background-color: #ffffff;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Melt Flow Rate (230°C / 2.16kg)</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">3.0 g/10min</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ASTM D1238</td>
                    </tr>
                  <tr style="background-color: #f9fafb;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Density</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">0.900 g/cm³</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ASTM D1505</td>
                    </tr>
                  <tr style="background-color: #ffffff;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Tensile Strength at Yield</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">33 MPa</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ASTM D638</td>
                    </tr>
                  <tr style="background-color: #f9fafb;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Flexural Modulus</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">1300 MPa</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ASTM D790</td>
                    </tr>
                  <tr style="background-color: #ffffff;">
                      <td style="padding: 10px; color: #374151; ">Notched Izod Impact (23°C)</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; ">30 J/m</td>
                      <td style="padding: 10px; color: #6b7280; ">ASTM D256</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Key Benefits</h2>
              <ul>
                <li><strong style="color: #1f2937;">Consistent Processability</strong><br>Excellent stability during high-speed production</li>
                <li><strong style="color: #1f2937;">Balanced Mechanicals</strong><br>Good combination of stiffness and tensile strength</li>
                <li><strong style="color: #1f2937;">Broad Processing Window</strong><br>Suitable for both extrusion and injection molding</li>
                <li><strong style="color: #1f2937;">Food Contact Compliant</strong><br>Safe for use in food packaging applications</li>
                <li><strong style="color: #1f2937;">Cost-Effective Performance</strong><br>Ideal for high-volume commodity goods</li>
              </ul>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Recommended Applications</h2>
              <ul style="color: #374151; line-height: 1.8;"><li style="padding: 4px 0;">Woven sacks & raffia tapes</li>
                <li style="padding: 4px 0;">Monofilament & multifilament fibers</li>
                <li style="padding: 4px 0;">General purpose injection molding</li>
                <li style="padding: 4px 0;">Household containers & furniture</li>
                <li style="padding: 4px 0;">Industrial crates & rigid packaging</li>
              </ul>
            </div>
          
            <div class="highlight">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Processing Guidelines</h2>
              <p style="color: #374151; line-height: 1.7;">
                Recommended barrel temperature: <strong style="color: #1f2937;">220–280°C</strong> (Extrusion) / <strong style="color: #1f2937;">200–240°C</strong> (Injection)<br>
                Mold temperature: <strong style="color: #1f2937;">20–40°C</strong><br>
                Ensure proper screw design for optimum melt homogeneity.
              </p>
            </div>
          </div>
        `,
        isActive: true,
        categories: ['Polypropylene (PP)'],
        features: ['Food Grade', 'Recyclable', 'High Flow'],
        applications: ['Packaging', 'Textiles', 'Consumer Goods']
      },
      {
        companyId: getCompanyId('SABIC'),
        name: 'SABIC PP 500P',
        slug: 'sabic-pp-500p',
        shortDescription: 'High-stiffness polypropylene homopolymer designed for rigid packaging and demanding automotive applications.',
        seoTitle: 'SABIC PP 500P – Polypropylene Homopolymer | Shashvat Trading',
        seoDescription: 'High-stiffness polypropylene homopolymer designed for rigid packaging and furniture. Features excellent heat resistance, dimensional stability, and toughness.',
        contentHtml: `
          <div class="product-wrapper">
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Product Overview</h2>
              <p style="color: #374151; line-height: 1.7;"><strong style="color: #1f2937;">SABIC PP 500P</strong> is a medium-flow polypropylene homopolymer grade characterized by high stiffness and excellent heat resistance. It is specifically formulated to provide superior dimensional stability for rigid packaging, closures, and furniture applications where structural integrity is paramount.
              </p>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Technical Specifications</h2>
              <div class="table-responsive">
                <table class="spec-table" style="width: 100%; border-collapse: collapse;">
                  <thead>
                    <tr style="background-color: #f1f5f9;">
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Property</th>
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Value</th>
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Test Method</th>
                    </tr>
                  </thead>
                  <tbody>
                  <tr style="background-color: #ffffff;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Melt Flow Rate (230°C / 2.16kg)</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">5.0 g/10min</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ISO 1133</td>
                    </tr>
                  <tr style="background-color: #f9fafb;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Density</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">0.905 g/cm³</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ISO 1183</td>
                    </tr>
                  <tr style="background-color: #ffffff;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Tensile Modulus</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">1600 MPa</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ISO 527-2</td>
                    </tr>
                  <tr style="background-color: #f9fafb;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Flexural Modulus</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">1550 MPa</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ISO 178</td>
                    </tr>
                  <tr style="background-color: #ffffff;">
                      <td style="padding: 10px; color: #374151; ">Heat Deflection Temperature</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; ">105°C</td>
                      <td style="padding: 10px; color: #6b7280; ">ISO 75-2</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Key Benefits</h2>
              <ul>
                <li><strong style="color: #1f2937;">High Stiffness</strong><br>Excellent structural rigidity for thin-walled parts</li>
                <li><strong style="color: #1f2937;">Superior Heat Resistance</strong><br>Suitable for hot-fill and microwaveable applications</li>
                <li><strong style="color: #1f2937;">Dimensional Stability</strong><br>Low warpage and consistent part dimensions</li>
                <li><strong style="color: #1f2937;">Chemical Resistance</strong><br>Resistant to oils, greases, and common solvents</li>
                <li><strong style="color: #1f2937;">Glossy Surface Finish</strong><br>Premium aesthetic appeal for consumer goods</li>
              </ul>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Recommended Applications</h2>
              <ul style="color: #374151; line-height: 1.8;"><li style="padding: 4px 0;">Rigid food packaging & containers</li>
                <li style="padding: 4px 0;">Caps & closures</li>
                <li style="padding: 4px 0;">Garden furniture & crates</li>
                <li style="padding: 4px 0;">Housewares & kitchenware</li>
              </ul>
            </div>
          
            <div class="highlight">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Processing Guidelines</h2>
              <p style="color: #374151; line-height: 1.7;">
                Recommended melt temperature: <strong style="color: #1f2937;">200–235°C</strong><br>
                Mold temperature: <strong style="color: #1f2937;">15–40°C</strong><br>
                Higher injection pressures may be required to fill complex molds due to stiffness.
              </p>
            </div>
          </div>
        `,
        isActive: true,
        categories: ['Polypropylene (PP)'],
        features: ['High Impact Resistance', 'Heat Resistant', 'Chemical Resistant'],
        applications: ['Automotive', 'Packaging', 'Consumer Goods']
      },
      {
        companyId: getCompanyId('ExxonMobil'),
        name: 'Achieve PP 3854',
        slug: 'exxonmobil-achieve-pp-3854',
        shortDescription: 'Impact copolymer PP with exceptional low-temperature impact properties for automotive and appliance applications.',
        seoTitle: 'Achieve PP 3854 – Impact Copolymer Resin | Shashvat Trading',
        seoDescription: 'Advanced impact copolymer polypropylene offering exceptional low-temperature toughness and impact balance. Ideal for automotive, appliances, and durable goods.',
        contentHtml: `
          <div class="product-wrapper">
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Product Overview</h2>
              <p style="color: #374151; line-height: 1.7;"><strong style="color: #1f2937;">Achieve PP 3854</strong> by ExxonMobil is a high-performance impact copolymer polypropylene designed for demanding applications requiring superior toughness. It offers exceptional low-temperature impact resistance while maintaining excellent processability, making it the material of choice for automotive and appliance components.
              </p>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Technical Specifications</h2>
              <div class="table-responsive">
                <table class="spec-table" style="width: 100%; border-collapse: collapse;">
                  <thead>
                    <tr style="background-color: #f1f5f9;">
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Property</th>
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Value</th>
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Test Method</th>
                    </tr>
                  </thead>
                  <tbody>
                  <tr style="background-color: #ffffff;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Melt Flow Rate (230°C / 2.16kg)</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">8.5 g/10min</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ASTM D1238</td>
                    </tr>
                  <tr style="background-color: #f9fafb;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Density</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">0.900 g/cm³</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ASTM D792</td>
                    </tr>
                  <tr style="background-color: #ffffff;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Notched Izod Impact (23°C)</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">450 J/m</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ASTM D256</td>
                    </tr>
                  <tr style="background-color: #f9fafb;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Notched Izod Impact (-20°C)</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">100 J/m</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ASTM D256</td>
                    </tr>
                  <tr style="background-color: #ffffff;">
                      <td style="padding: 10px; color: #374151; ">Flexural Modulus</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; ">1100 MPa</td>
                      <td style="padding: 10px; color: #6b7280; ">ASTM D790</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Key Benefits</h2>
              <ul>
                <li><strong style="color: #1f2937;">Exceptional Toughness</strong><br>High impact resistance even at widely varying temperatures</li>
                <li><strong style="color: #1f2937;">Low Temperature Performance</strong><br>Maintains ductility in sub-zero environments</li>
                <li><strong style="color: #1f2937;">Optimized Stiffness-Impact Balance</strong><br>Engineered for durability without compromising rigidity</li>
                <li><strong style="color: #1f2937;">Consistent Processability</strong><br>Stable flow for uniform molding of large parts</li>
                <li><strong style="color: #1f2937;">Fully Recyclable</strong><br>Sustainable choice for durable good applications</li>
              </ul>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Recommended Applications</h2>
              <ul style="color: #374151; line-height: 1.8;"><li style="padding: 4px 0;">Automotive interior trims & bumpers</li>
                <li style="padding: 4px 0;">Appliance housings & components</li>
                <li style="padding: 4px 0;">Industrial pails & containers</li>
                <li style="padding: 4px 0;">Luggage & durable consumer goods</li>
              </ul>
            </div>
          
            <div class="highlight">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Processing Guidelines</h2>
              <p style="color: #374151; line-height: 1.7;">
                Recommended melt temperature: <strong style="color: #1f2937;">190–230°C</strong><br>
                Mold temperature: <strong style="color: #1f2937;">20–50°C</strong><br>
                Injection speed should be controlled to prevent jetting in high-impact grades.
              </p>
            </div>
          </div>
        `,
        isActive: true,
        categories: ['Polypropylene (PP)'],
        features: ['High Impact Resistance', 'Weather Resistant', 'Recyclable'],
        applications: ['Automotive', 'Consumer Goods', 'Injection Molding']
      },
      {
        companyId: getCompanyId('Braskem'),
        name: 'Braskem PP CP442XP',
        slug: 'braskem-pp-cp442xp',
        shortDescription: 'Random copolymer PP offering exceptional optical clarity for transparent food packaging applications.',
        seoTitle: 'Braskem PP CP442XP – Random Copolymer PP | Shashvat Trading',
        seoDescription: 'High-clarity random copolymer polypropylene for transparent food containers. Features crystal clear optics, high flow, and excellent organoleptic properties.',
        contentHtml: `
          <div class="product-wrapper">
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Product Overview</h2>
              <p style="color: #374151; line-height: 1.7;"><strong style="color: #1f2937;">Braskem PP CP442XP</strong> is a premium random copolymer polypropylene engineered for applications requiring superior optical properties. With high flow and crystal-clear transparency, it allows for the production of aesthetically pleasing, thin-walled packaging that rivals glass in clarity while maintaining the durability of plastic.
              </p>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Technical Specifications</h2>
              <div class="table-responsive">
                <table class="spec-table" style="width: 100%; border-collapse: collapse;">
                  <thead>
                    <tr style="background-color: #f1f5f9;">
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Property</th>
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Value</th>
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Test Method</th>
                    </tr>
                  </thead>
                  <tbody>
                  <tr style="background-color: #ffffff;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Melt Flow Rate (230°C / 2.16kg)</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">25 g/10min</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ASTM D1238</td>
                    </tr>
                  <tr><td>Haze</td><td>< 5%</td><td>ASTM D1003</td></tr>
                  <tr style="background-color: #f9fafb;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Gloss (60°)</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">> 95%</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ASTM D2457</td>
                    </tr>
                  <tr style="background-color: #ffffff;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Flexural Modulus</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">950 MPa</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ASTM D790</td>
                    </tr>
                  <tr style="background-color: #f9fafb;">
                      <td style="padding: 10px; color: #374151; ">Notched Izod Impact (23°C)</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; ">50 J/m</td>
                      <td style="padding: 10px; color: #6b7280; ">ASTM D256</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Key Benefits</h2>
              <ul>
                <li><strong style="color: #1f2937;">Crystal Clear Optics</strong><br>Ultra-low haze and high gloss for shelf appeal</li>
                <li><strong style="color: #1f2937;">Excellent Flow</strong><br>High MFR enables thin-wall injection molding with ease</li>
                <li><strong style="color: #1f2937;">Low Odor & Taste</strong><br>Superior organoleptic properties for sensitive food applications</li>
                <li><strong style="color: #1f2937;">Fast Cycle Times</strong><br>Optimized crystallization for improved productivity</li>
                <li><strong style="color: #1f2937;">Consumer Safe</strong><br>BPA-free and FDA approved for food contact</li>
              </ul>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Recommended Applications</h2>
              <ul style="color: #374151; line-height: 1.8;"><li style="padding: 4px 0;">Clear food storage containers</li>
                <li style="padding: 4px 0;">Thin-wall food packaging</li>
                <li style="padding: 4px 0;">Media cases & storage boxes</li>
                <li style="padding: 4px 0;">Housewares & drinkware</li>
              </ul>
            </div>
          
            <div class="highlight">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Processing Guidelines</h2>
              <p style="color: #374151; line-height: 1.7;">
                Recommended melt temperature: <strong style="color: #1f2937;">200–240°C</strong><br>
                Mold temperature: <strong style="color: #1f2937;">15–30°C</strong> (Lower mold temps improve clarity)<br>
                High injection speeds are recommended to maximize transparency.
              </p>
            </div>
          </div>
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
        slug: 'formosa-formolene-hdpe-5502',
        heroImage: 'https://images.unsplash.com/photo-1591123720164-de1348b2c4da?auto=format&fit=crop&q=80&w=600',
        shortDescription: 'High-density polyethylene designed for blow molding of containers, bottles, and drums with excellent ESCR.',
        seoTitle: 'Formolene HDPE 5502 – HDPE Copolymer Resin | Shashvat Trading',
        seoDescription: 'Blow molding grade HDPE copolymer offering outstanding environmental stress crack resistance (ESCR). Ideal for household, industrial, and automotive fluid containers.',
        contentHtml: `
          <div class="product-wrapper">
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Product Overview</h2>
              <p style="color: #374151; line-height: 1.7;"><strong style="color: #1f2937;">Formolene HDPE 5502</strong> is a high-density polyethylene copolymer specifically designed for extrusion blow molding. It features an exceptional combination of stiffness and environmental stress crack resistance (ESCR), making it the resin of choice for containers holding aggressive chemicals, detergents, and industrial fluids.
              </p>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Technical Specifications</h2>
              <div class="table-responsive">
                <table class="spec-table" style="width: 100%; border-collapse: collapse;">
                  <thead>
                    <tr style="background-color: #f1f5f9;">
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Property</th>
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Value</th>
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Test Method</th>
                    </tr>
                  </thead>
                  <tbody>
                  <tr style="background-color: #ffffff;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Density</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">0.955 g/cm³</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ASTM D1505</td>
                    </tr>
                  <tr style="background-color: #f9fafb;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Melt Index (190°C / 2.16kg)</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">0.35 g/10min</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ASTM D1238</td>
                    </tr>
                  <tr style="background-color: #ffffff;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">ESCR (Condition B, F50)</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">> 1000 hrs</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ASTM D1693</td>
                    </tr>
                  <tr style="background-color: #f9fafb;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Tensile Strength at Yield</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">28 MPa</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ASTM D638</td>
                    </tr>
                  <tr style="background-color: #ffffff;">
                      <td style="padding: 10px; color: #374151; ">Flexural Modulus</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; ">1100 MPa</td>
                      <td style="padding: 10px; color: #6b7280; ">ASTM D790</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Key Benefits</h2>
              <ul>
                <li><strong style="color: #1f2937;">Outstanding ESCR</strong><br>Superior resistance to cracking in surfactant environments</li>
                <li><strong style="color: #1f2937;">High Rigidity</strong><br>Excellent top-load strength for stacking performance</li>
                <li><strong style="color: #1f2937;">Excellent Melt Strength</strong><br>Stable parison control for extrusion blow molding</li>
                <li><strong style="color: #1f2937;">Chemical Inertness</strong><br>Compatible with a wide range of industrial chemicals</li>
                <li><strong style="color: #1f2937;">Versatile Processing</strong><br>Runs efficiently on continuous extrusions equipment</li>
              </ul>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Recommended Applications</h2>
              <ul style="color: #374151; line-height: 1.8;"><li style="padding: 4px 0;">Detergent & bleach bottles</li>
                <li style="padding: 4px 0;">Industrial chemical containers</li>
                <li style="padding: 4px 0;">Automotive fluid reservoirs</li>
                <li style="padding: 4px 0;">Pharmaceutical packaging</li>
                <li style="padding: 4px 0;">Personal care bottles</li>
              </ul>
            </div>
          
            <div class="highlight">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Processing Guidelines</h2>
              <p style="color: #374151; line-height: 1.7;">
                Recommended barrel temperature: <strong style="color: #1f2937;">180–220°C</strong><br>
                Head/die temperature: <strong style="color: #1f2937;">190–210°C</strong><br>
                Pre-drying is not typically required. Maintain consistent cooling for optimal dimensional control.
              </p>
            </div>
          </div>
        `,
        isActive: true,
        categories: ['Polyethylene (PE)', 'HDPE'],
        features: ['Chemical Resistant', 'High Impact Resistance', 'Recyclable'],
        applications: ['Packaging', 'Consumer Goods', 'Blow Molding']
      },
      {
        companyId: getCompanyId('SABIC'),
        name: 'SABIC LLDPE 118W',
        slug: 'sabic-lldpe-118w',
        shortDescription: 'Linear low-density polyethylene for high-performance films.',
        seoTitle: 'SABIC LLDPE 118W – Linear Low Density PE | Shashvat Trading',
        seoDescription: 'Butene-grade linear low density polyethylene for general film applications. Offers excellent heat seal, puncture resistance, and balanced mechanical properties.',
        contentHtml: `
          <div class="product-wrapper">
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Product Overview</h2>
              <p style="color: #374151; line-height: 1.7;"><strong style="color: #1f2937;">SABIC LLDPE 118W</strong> is a butene-copolymer linear low-density polyethylene resin designed for general-purpose film extrusion. It contains slip and antiblock additives to facilitate easy processing and handling, delivering films with a superior balance of toughness, puncture resistance, and sealing performance.
              </p>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Technical Specifications</h2>
              <div class="table-responsive">
                <table class="spec-table" style="width: 100%; border-collapse: collapse;">
                  <thead>
                    <tr style="background-color: #f1f5f9;">
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Property</th>
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Value</th>
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Test Method</th>
                    </tr>
                  </thead>
                  <tbody>
                  <tr style="background-color: #ffffff;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Density</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">0.918 g/cm³</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ASTM D1505</td>
                    </tr>
                  <tr style="background-color: #f9fafb;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Melt Index (190°C / 2.16kg)</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">1.0 g/10min</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ASTM D1238</td>
                    </tr>
                  <tr style="background-color: #ffffff;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Tensile Strength at Break</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">35 MPa (MD)</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ASTM D882</td>
                    </tr>
                  <tr style="background-color: #f9fafb;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Elongation at Break</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">> 600%</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ASTM D882</td>
                    </tr>
                  <tr style="background-color: #ffffff;">
                      <td style="padding: 10px; color: #374151; ">Dart Drop Impact</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; ">110 g</td>
                      <td style="padding: 10px; color: #6b7280; ">ASTM D1709</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Key Benefits</h2>
              <ul>
                <li><strong style="color: #1f2937;">Excellent Sealability</strong><br>Strong heat seals even through contamination</li>
                <li><strong style="color: #1f2937;">Balanced Toughness</strong><br>Good tensile strength and puncture resistance</li>
                <li><strong style="color: #1f2937;">Easy Processing</strong><br>Contains slip and antiblock for high-speed lines</li>
                <li><strong style="color: #1f2937;">Versatile Blending</strong><br>Ideal for blending with LDPE to enhance properties</li>
                <li><strong style="color: #1f2937;">Cost-Effective</strong><br>Efficient solution for commodity film applications</li>
              </ul>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Recommended Applications</h2>
              <ul style="color: #374151; line-height: 1.8;"><li style="padding: 4px 0;">General purpose packaging films</li>
                <li style="padding: 4px 0;">Agricultural films & mulching</li>
                <li style="padding: 4px 0;">Food packaging & liners</li>
                <li style="padding: 4px 0;">Garbage bags & heavy duty sacks</li>
                <li style="padding: 4px 0;">Lamination films</li>
              </ul>
            </div>
          
            <div class="highlight">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Processing Guidelines</h2>
              <p style="color: #374151; line-height: 1.7;">
                Recommended melt temperature: <strong style="color: #1f2937;">180–220°C</strong><br>
                Blow-up ratio: <strong style="color: #1f2937;">2:1 to 3:1</strong><br>
                Die gap: <strong style="color: #1f2937;">1.8–2.5 mm</strong> is recommended for optimal film properties.
              </p>
            </div>
          </div>
        `,
        isActive: true,
        categories: ['Polyethylene (PE)', 'LLDPE'],
        features: ['High Clarity', 'Recyclable', 'Food Grade'],
        applications: ['Film & Sheet', 'Packaging', 'Agriculture']
      },
      {
        companyId: getCompanyId('Dow Chemical'),
        name: 'DOWLEX 2045G',
        slug: 'dow-dowlex-2045g',
        shortDescription: 'Premium octene-based LLDPE resin for heavy-duty bags and industrial packaging requiring superior toughness.',
        seoTitle: 'DOWLEX 2045G – Octene LLDPE Resin | Shashvat Trading',
        seoDescription: 'High-performance octene-based LLDPE for industrial packaging. Offers superior toughness, tear resistance, and sealability for heavy-duty applications.',
        contentHtml: `
          <div class="product-wrapper">
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Product Overview</h2>
              <p style="color: #374151; line-height: 1.7;"><strong style="color: #1f2937;">DOWLEX™ 2045G</strong> is a premium octene-copolymer linear low-density polyethylene (LLDPE) renowned for its outstanding toughness and tear resistance. It sets the standard for high-performance film applications, offering excellent puncture resistance and sealability.
              </p>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Technical Specifications</h2>
              <div class="table-responsive">
                <table class="spec-table" style="width: 100%; border-collapse: collapse;">
                  <thead>
                    <tr style="background-color: #f1f5f9;">
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Property</th>
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Value</th>
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Test Method</th>
                    </tr>
                  </thead>
                  <tbody>
                  <tr style="background-color: #ffffff;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Density</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">0.920 g/cm³</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ASTM D792</td>
                    </tr>
                  <tr style="background-color: #f9fafb;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Melt Index (190°C / 2.16kg)</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">1.0 g/10min</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ASTM D1238</td>
                    </tr>
                  <tr style="background-color: #ffffff;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Tensile Strength at Yield</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">12 MPa</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ASTM D882</td>
                    </tr>
                  <tr style="background-color: #f9fafb;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Ultimate Tensile Strength</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">45 MPa</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ASTM D882</td>
                    </tr>
                  <tr style="background-color: #ffffff;">
                      <td style="padding: 10px; color: #374151; ">Elmendorf Tear (MD)</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; ">350 g</td>
                      <td style="padding: 10px; color: #6b7280; ">ASTM D1922</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Key Benefits</h2>
              <ul>
                <li><strong style="color: #1f2937;">Superior Toughness</strong><br>Exceptional impact strength and puncture resistance</li>
                <li><strong style="color: #1f2937;">Down-gauging Potential</strong><br>Allows for thinner films without compromising strength</li>
                <li><strong style="color: #1f2937;">Excellent Sealability</strong><br>Broad hot-tack window for efficient packaging</li>
                <li><strong style="color: #1f2937;">Optical Clarity</strong><br>Good transparency for consumer appeal</li>
                <li><strong style="color: #1f2937;">Consistent Processability</strong><br>Reliable performance on high-speed lines</li>
              </ul>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Recommended Applications</h2>
              <ul style="color: #374151; line-height: 1.8;"><li style="padding: 4px 0;">Heavy-duty shipping sacks</li>
                <li style="padding: 4px 0;">Industrial liners & shrink films</li>
                <li style="padding: 4px 0;">Agricultural films</li>
                <li style="padding: 4px 0;">Frozen food packaging</li>
                <li style="padding: 4px 0;">Liquid packaging films</li>
              </ul>
            </div>
          
            <div class="highlight">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Processing Guidelines</h2>
              <p style="color: #374151; line-height: 1.7;">
                Recommended melt temperature: <strong style="color: #1f2937;">200–225°C</strong><br>
                Blow-up ratio: <strong style="color: #1f2937;">2:1 to 3:1</strong><br>
                Die gap: <strong style="color: #1f2937;">1.8–2.5 mm</strong> typical for optimal film properties.
              </p>
            </div>
          </div>
        `,
        isActive: true,
        categories: ['Polyethylene (PE)', 'LLDPE'],
        features: ['High Impact Resistance', 'Recyclable', 'Chemical Resistant'],
        applications: ['Packaging', 'Agriculture', 'Film & Sheet']
      },
      {
        companyId: getCompanyId('ExxonMobil'),
        name: 'Exceed XP 8656',
        slug: 'exxonmobil-exceed-xp-8656',
        shortDescription: 'Metallocene-catalyzed PE delivering exceptional clarity, toughness, and sealability for demanding film applications.',
        seoTitle: 'Exceed XP 8656 – Metallocene LLDPE | Shashvat Trading',
        seoDescription: 'Extreme performance metallocene polyethylene designed for film applications requiring superior toughness, flex-crack resistance, and sealability.',
        contentHtml: `
          <div class="product-wrapper">
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Product Overview</h2>
              <p style="color: #374151; line-height: 1.7;"><strong style="color: #1f2937;">Exceed™ XP 8656</strong> is an extreme performance metallocene polyethylene (mPE) resin. It delivers a step-change in toughness, flex-crack resistance, and sealability, making it ideal for the most demanding flexible packaging applications including liquid pouches and greenhouse films.
              </p>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Technical Specifications</h2>
              <div class="table-responsive">
                <table class="spec-table" style="width: 100%; border-collapse: collapse;">
                  <thead>
                    <tr style="background-color: #f1f5f9;">
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Property</th>
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Value</th>
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Test Method</th>
                    </tr>
                  </thead>
                  <tbody>
                  <tr style="background-color: #ffffff;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Density</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">0.916 g/cm³</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ASTM D1505</td>
                    </tr>
                  <tr style="background-color: #f9fafb;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Melt Index (190°C / 2.16kg)</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">0.5 g/10min</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ASTM D1238</td>
                    </tr>
                  <tr style="background-color: #ffffff;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Haze</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">8.0 %</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ASTM D1003</td>
                    </tr>
                  <tr style="background-color: #f9fafb;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Gloss (45°)</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">55</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ASTM D2457</td>
                    </tr>
                  <tr style="background-color: #ffffff;">
                      <td style="padding: 10px; color: #374151; ">Dart Drop Impact</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; ">> 1000 g</td>
                      <td style="padding: 10px; color: #6b7280; ">ASTM D1709</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Key Benefits</h2>
              <ul>
                <li><strong style="color: #1f2937;">Extreme Toughness</strong><br>Unmatched drop and puncture resistance</li>
                <li><strong style="color: #1f2937;">Flex-Crack Resistance</strong><br>Prevents leaks in liquid packaging</li>
                <li><strong style="color: #1f2937;">Superior Melt Strength</strong><br>Excellent bubble stability for large lines</li>
                <li><strong style="color: #1f2937;">Low Sealing Temperature</strong><br>Fast packaging speeds with secure seals</li>
                <li><strong style="color: #1f2937;">High Integrity</strong><br>Protects contents through rigorous supply chains</li>
              </ul>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Recommended Applications</h2>
              <ul style="color: #374151; line-height: 1.8;"><li style="padding: 4px 0;">Bag-in-box liquids</li>
                <li style="padding: 4px 0;">Heavy-duty sack films</li>
                <li style="padding: 4px 0;">Greenhouse & agricultural films</li>
                <li style="padding: 4px 0;">Meat & cheese barrier films</li>
                <li style="padding: 4px 0;">Stretch hood films</li>
              </ul>
            </div>
          
            <div class="highlight">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Processing Guidelines</h2>
              <p style="color: #374151; line-height: 1.7;">
                Recommended melt temperature: <strong style="color: #1f2937;">190–210°C</strong><br>
                Blow-up ratio: <strong style="color: #1f2937;">2.5:1</strong> or higher recommended.<br>
                Can be processed on conventional LDPE or LLDPE equipment.
              </p>
            </div>
          </div>
        `,
        isActive: true,
        categories: ['Polyethylene (PE)', 'LLDPE'],
        features: ['High Clarity', 'Recyclable', 'Food Grade'],
        applications: ['Film & Sheet', 'Packaging']
      },
      {
        companyId: getCompanyId('Reliance Industries'),
        name: 'Relene HDPE M60075',
        slug: 'reliance-relene-hdpe-m60075',
        shortDescription: 'HDPE designed for pressure pipe applications with excellent long-term hydrostatic strength and crack resistance.',
        seoTitle: 'Relene HDPE M60075 – PE100 Pipe Grade | Shashvat Trading',
        seoDescription: 'PE100 certified HDPE resin for pressure pipes. Features exceptional long-term hydrostatic strength (MRS 10.0) and resistance to slow crack growth.',
        contentHtml: `
          <div class="product-wrapper">
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Product Overview</h2>
              <p style="color: #374151; line-height: 1.7;"><strong style="color: #1f2937;">Relene HDPE M60075</strong> is a high-density polyethylene resin certified as PE100 material. Specifically engineered for pressure pipe applications, it offers superior long-term hydrostatic strength (MRS 10.0) and outstanding resistance to slow crack growth (SCG) and rapid crack propagation (RCP).
              </p>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Technical Specifications</h2>
              <div class="table-responsive">
                <table class="spec-table" style="width: 100%; border-collapse: collapse;">
                  <thead>
                    <tr style="background-color: #f1f5f9;">
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Property</th>
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Value</th>
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Test Method</th>
                    </tr>
                  </thead>
                  <tbody>
                  <tr style="background-color: #ffffff;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Density (Base Resin)</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">0.950 g/cm³</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ASTM D1505</td>
                    </tr>
                  <tr style="background-color: #f9fafb;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Density (Coumpound)</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">0.960 g/cm³</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ASTM D1505</td>
                    </tr>
                  <tr style="background-color: #ffffff;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Melt Flow Rate (190°C / 5kg)</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">0.25 g/10min</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ISO 1133</td>
                    </tr>
                  <tr style="background-color: #f9fafb;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">MRS Classification</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">10.0 MPa (PE100)</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ISO 9080</td>
                    </tr>
                  <tr style="background-color: #ffffff;">
                      <td style="padding: 10px; color: #374151; ">Carbon Black Content</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; ">2.5 %</td>
                      <td style="padding: 10px; color: #6b7280; ">ISO 6964</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Key Benefits</h2>
              <ul>
                <li><strong style="color: #1f2937;">PE100 Certified</strong><br>Meets international standards for pressure pipes</li>
                <li><strong style="color: #1f2937;">Durability</strong><br>50+ year service life expectancy</li>
                <li><strong style="color: #1f2937;">Crack Resistance</strong><br>Superior ESCR and SCG resistance</li>
                <li><strong style="color: #1f2937;">UV Stabilized</strong><br>Contains carbon black for outdoor weatherability</li>
                <li><strong style="color: #1f2937;">Chemical Resistance</strong><br>Inert to soil chemicals and water disinfectants</li>
              </ul>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Recommended Applications</h2>
              <ul style="color: #374151; line-height: 1.8;"><li style="padding: 4px 0;">Potable water distribution pipes</li>
                <li style="padding: 4px 0;">Gas distribution networks</li>
                <li style="padding: 4px 0;">Sewage & drainage pipes</li>
                <li style="padding: 4px 0;">Industrial effluent disposal</li>
                <li style="padding: 4px 0;">Submarine pipelines</li>
              </ul>
            </div>
          
            <div class="highlight">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Processing Guidelines</h2>
              <p style="color: #374151; line-height: 1.7;">
                Recommended melt temperature: <strong style="color: #1f2937;">190–220°C</strong><br>
                Drying: Pre-drying at <strong style="color: #1f2937;">80°C for 2 hours</strong> recommended.<br>
                Avoid overheating to prevent oxidation of stabilizer package.
              </p>
            </div>
          </div>
        `,
        isActive: true,
        categories: ['Polyethylene (PE)', 'HDPE'],
        features: ['Chemical Resistant', 'UV Stabilized', 'Weather Resistant'],
        applications: ['Pipes & Fittings', 'Construction']
      },
      {
        companyId: getCompanyId('Braskem'),
        name: 'Braskem LDPE PB608',
        slug: 'braskem-ldpe-pb608',
        shortDescription: 'LDPE resin offering excellent processability and optical properties for general purpose film applications.',
        seoTitle: 'Braskem LDPE PB608 – Low Density Polyethylene | Shashvat Trading',
        seoDescription: 'Versatile LDPE resin for general purpose films. Features excellent optical properties, processability, and balanced mechanical strength.',
        contentHtml: `
          <div class="product-wrapper">
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Product Overview</h2>
              <p style="color: #374151; line-height: 1.7;"><strong style="color: #1f2937;">Braskem LDPE PB608</strong> is a low-density polyethylene resin designed for general-purpose film extrusion. It offers an excellent balance of optical properties, draw-down capability, and mechanical strength, making it a reliable choice for flexible packaging solutions.
              </p>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Technical Specifications</h2>
              <div class="table-responsive">
                <table class="spec-table" style="width: 100%; border-collapse: collapse;">
                  <thead>
                    <tr style="background-color: #f1f5f9;">
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Property</th>
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Value</th>
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Test Method</th>
                    </tr>
                  </thead>
                  <tbody>
                  <tr style="background-color: #ffffff;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Density</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">0.923 g/cm³</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ASTM D1505</td>
                    </tr>
                  <tr style="background-color: #f9fafb;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Melt Index (190°C / 2.16kg)</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">3.0 g/10min</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ASTM D1238</td>
                    </tr>
                  <tr style="background-color: #ffffff;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Tensile Strength</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">24 MPa</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ASTM D882</td>
                    </tr>
                  <tr style="background-color: #f9fafb;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Elongation at Break</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">500%</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ASTM D882</td>
                    </tr>
                  <tr style="background-color: #ffffff;">
                      <td style="padding: 10px; color: #374151; ">Haze</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; ">7.0 %</td>
                      <td style="padding: 10px; color: #6b7280; ">ASTM D1003</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Key Benefits</h2>
              <ul>
                <li><strong style="color: #1f2937;">Excellent Processability</strong><br>High melt stability and easy bubble control</li>
                <li><strong style="color: #1f2937;">High Clarity</strong><br>Low haze for good product visibility</li>
                <li><strong style="color: #1f2937;">Good Draw-down</strong><br>Can be processed into thin films efficiently</li>
                <li><strong style="color: #1f2937;">Balanced Mechanicals</strong><br>Suitable for general packaging needs</li>
                <li><strong style="color: #1f2937;">Food Contact Compliant</strong><br>Safe for food packaging applications</li>
              </ul>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Recommended Applications</h2>
              <ul style="color: #374151; line-height: 1.8;"><li style="padding: 4px 0;">Food packaging bags</li>
                <li style="padding: 4px 0;">Textile packaging</li>
                <li style="padding: 4px 0;">Lamination films</li>
                <li style="padding: 4px 0;">General purpose clear bags</li>
                <li style="padding: 4px 0;">Blending resin for LLDPE</li>
              </ul>
            </div>
          
            <div class="highlight">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Processing Guidelines</h2>
              <p style="color: #374151; line-height: 1.7;">
                Recommended melt temperature: <strong style="color: #1f2937;">160–190°C</strong><br>
                Blow-up ratio: <strong style="color: #1f2937;">2:1 to 3:1</strong><br>
                Die gap: <strong style="color: #1f2937;">0.8–1.0 mm</strong> recommended.
              </p>
            </div>
          </div>
        `,
        isActive: true,
        categories: ['Polyethylene (PE)', 'LDPE'],
        features: ['High Clarity', 'Food Grade', 'Recyclable'],
        applications: ['Film & Sheet', 'Packaging']
      },
      {
        companyId: getCompanyId('Dow Chemical'),
        name: 'DOW LDPE 722',
        slug: 'dow-ldpe-722',
        shortDescription: 'Versatile LDPE for packaging film and extrusion coating applications with excellent clarity and seal strength.',
        seoTitle: 'DOW LDPE 722 – Extrusion Coating Resin | Shashvat Trading',
        seoDescription: 'Low density polyethylene designed for extrusion coating and lamination. Offers low neck-in, excellent adhesion, and good heat sealability.',
        contentHtml: `
          <div class="product-wrapper">
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Product Overview</h2>
              <p style="color: #374151; line-height: 1.7;"><strong style="color: #1f2937;">DOW™ LDPE 722</strong> is a versatile low-density polyethylene resin designed specifically for extrusion coating and lamination applications. It is characterized by excellent processability with low neck-in and high drawdown, providing uniform coating at high line speeds.
              </p>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Technical Specifications</h2>
              <div class="table-responsive">
                <table class="spec-table" style="width: 100%; border-collapse: collapse;">
                  <thead>
                    <tr style="background-color: #f1f5f9;">
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Property</th>
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Value</th>
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Test Method</th>
                    </tr>
                  </thead>
                  <tbody>
                  <tr style="background-color: #ffffff;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Density</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">0.918 g/cm³</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ASTM D792</td>
                    </tr>
                  <tr style="background-color: #f9fafb;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Melt Index (190°C / 2.16kg)</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">8.0 g/10min</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ASTM D1238</td>
                    </tr>
                  <tr style="background-color: #ffffff;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Vicat Softening Temp</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">91°C</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ASTM D1525</td>
                    </tr>
                  <tr style="background-color: #f9fafb;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Melting Point</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">107°C</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">Dow Method</td>
                    </tr>
                  <tr style="background-color: #ffffff;">
                      <td style="padding: 10px; color: #374151; ">Tensile Yield</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; ">8.3 MPa</td>
                      <td style="padding: 10px; color: #6b7280; ">ASTM D638</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Key Benefits</h2>
              <ul>
                <li><strong style="color: #1f2937;">Superior Processability</strong><br>Low neck-in allows for wider coating width</li>
                <li><strong style="color: #1f2937;">High Drawdown</strong><br>Enables very thin coating layers</li>
                <li><strong style="color: #1f2937;">Excellent Adhesion</strong><br>Bonds well to paper, foil, and other substrates</li>
                <li><strong style="color: #1f2937;">Good Heat Seal</strong><br>Low sealing initiation temperature</li>
                <li><strong style="color: #1f2937;">Low Odor/Taste</strong><br>Suitable for food contact applications</li>
              </ul>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Recommended Applications</h2>
              <ul style="color: #374151; line-height: 1.8;"><li style="padding: 4px 0;">Liquid beverage cartons</li>
                <li style="padding: 4px 0;">Flexible packaging lamination</li>
                <li style="padding: 4px 0;">Sachet & pouch coatings</li>
                <li style="padding: 4px 0;">Sugar & condiment sachets</li>
                <li style="padding: 4px 0;">Industrial paper coating</li>
              </ul>
            </div>
          
            <div class="highlight">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Processing Guidelines</h2>
              <p style="color: #374151; line-height: 1.7;">
                Recommended melt temperature: <strong style="color: #1f2937;">285–325°C</strong> (for coating)<br>
                Air gap: <strong style="color: #1f2937;">10–15 cm</strong> recommended for optimal oxidation and adhesion.<br>
                Submit to corona treatment if printing or further bonding is required.
              </p>
            </div>
          </div>
        `,
        isActive: true,
        categories: ['Polyethylene (PE)', 'LDPE'],
        features: ['Food Grade', 'High Clarity', 'Recyclable'],
        applications: ['Packaging', 'Film & Sheet']
      },
      // ABS Products (4)
      {
        companyId: getCompanyId('LG Chem'),
        name: 'LUPOY ABS GP-2200',
        slug: 'lg-chem-lupoy-abs-gp-2200',
        heroImage: 'https://images.unsplash.com/photo-1581093450021-4a717001fe81?auto=format&fit=crop&q=80&w=600',
        shortDescription: 'General purpose ABS resin with excellent surface quality and impact resistance for electronics and automotive.',
        seoTitle: 'LG Chem LUPOY ABS GP-2200 – General Purpose ABS | Shashvat Trading',
        seoDescription: 'General purpose ABS resin offering an excellent balance of flow, impact strength, and surface aesthetics. Designed for injection molding of electric and electronic parts.',
        contentHtml: `
          <div class="product-wrapper">
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Product Overview</h2>
              <p style="color: #374151; line-height: 1.7;"><strong style="color: #1f2937;">LG Chem LUPOY ABS GP-2200</strong> is a general-purpose ABS injection molding grade that offers a versatile combination of impact strength, tensile stiffness, and processability. It delivers a quality surface finish suitable for a wide range of electric, electronic, and household applications.
              </p>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Technical Specifications</h2>
              <div class="table-responsive">
                <table class="spec-table" style="width: 100%; border-collapse: collapse;">
                  <thead>
                    <tr style="background-color: #f1f5f9;">
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Property</th>
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Value</th>
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Test Method</th>
                    </tr>
                  </thead>
                  <tbody>
                  <tr style="background-color: #ffffff;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Melt Flow Rate (220°C / 10kg)</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">21 g/10min</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ISO 1133</td>
                    </tr>
                  <tr style="background-color: #f9fafb;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Density</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">1.04 g/cm³</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ISO 1183</td>
                    </tr>
                  <tr style="background-color: #ffffff;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Tensile Strength</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">44 MPa</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ISO 527</td>
                    </tr>
                  <tr style="background-color: #f9fafb;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Flexural Modulus</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">2300 MPa</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ISO 178</td>
                    </tr>
                  <tr style="background-color: #ffffff;">
                      <td style="padding: 10px; color: #374151; ">Heat Deflection Temp</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; ">90°C</td>
                      <td style="padding: 10px; color: #6b7280; ">ISO 75</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Key Benefits</h2>
              <ul>
                <li><strong style="color: #1f2937;">Balanced Performance</strong><br>Optimized ratio of toughness to stiffness</li>
                <li><strong style="color: #1f2937;">Good Flowability</strong><br>Suitable for molding complex geometries</li>
                <li><strong style="color: #1f2937;">Impact Resistance</strong><br>Durable against drops and mechanical stress</li>
                <li><strong style="color: #1f2937;">Surface Aesthetics</strong><br>Smooth finish with good gloss retention</li>
                <li><strong style="color: #1f2937;">Cost-Effective</strong><br>Efficient solution for general molding needs</li>
              </ul>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Recommended Applications</h2>
              <ul style="color: #374151; line-height: 1.8;"><li style="padding: 4px 0;">Office automation equipment</li>
                <li style="padding: 4px 0;">Vacuum cleaner components</li>
                <li style="padding: 4px 0;">Small appliance housings</li>
                <li style="padding: 4px 0;">Toys and leisure goods</li>
                <li style="padding: 4px 0;">General electronic casings</li>
              </ul>
            </div>
          
            <div class="highlight">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Processing Guidelines</h2>
              <p style="color: #374151; line-height: 1.7;">
                Recommended melt temperature: <strong style="color: #1f2937;">210–240°C</strong><br>
                Mold temperature: <strong style="color: #1f2937;">40–70°C</strong><br>
                Drying required: <strong style="color: #1f2937;">80°C for 2–3 hours</strong> prior to processing.
              </p>
            </div>
          </div>
        `,
        isActive: true,
        categories: ['ABS Resins'],
        features: ['High Impact Resistance', 'High Clarity'],
        applications: ['Electronics', 'Consumer Goods', 'Automotive']
      },
      {
        companyId: getCompanyId('Chi Mei'),
        name: 'Chi Mei Polylac PA-757',
        slug: 'chi-mei-polylac-pa-757',
        heroImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600',
        shortDescription: 'High-gloss ABS for consumer electronics and appliances with superior surface finish and gloss retention.',
        seoTitle: 'Chi Mei Polylac PA-757 – High Gloss ABS Resin | Shashvat Trading',
        seoDescription: 'The world\'s standard high-gloss ABS resin. Features superior surface finish, high rigidity, and excellent impact resistance. Ideal for consumer electronics and appliances.',
        contentHtml: `
          <div class="product-wrapper">
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Product Overview</h2>
              <p style="color: #374151; line-height: 1.7;"><strong style="color: #1f2937;">Chi Mei Polylac® PA-757</strong> is the industry standard for high-gloss Acrylonitrile Butadiene Styrene (ABS) resin. Renowned for its brilliant surface finish, excellent color stability, and balanced mechanical properties, it is the preferred choice for consumer electronics housings and premium household appliances.
              </p>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Technical Specifications</h2>
              <div class="table-responsive">
                <table class="spec-table" style="width: 100%; border-collapse: collapse;">
                  <thead>
                    <tr style="background-color: #f1f5f9;">
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Property</th>
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Value</th>
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Test Method</th>
                    </tr>
                  </thead>
                  <tbody>
                  <tr style="background-color: #ffffff;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Melt Flow Rate (200°C / 5kg)</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">1.8 g/10min</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ISO 1133</td>
                    </tr>
                  <tr style="background-color: #f9fafb;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Density</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">1.05 g/cm³</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ISO 1183</td>
                    </tr>
                  <tr style="background-color: #ffffff;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Tensile Strength</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">48 MPa</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ISO 527</td>
                    </tr>
                  <tr style="background-color: #f9fafb;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Flexural Modulus</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">2600 MPa</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ISO 178</td>
                    </tr>
                  <tr style="background-color: #ffffff;">
                      <td style="padding: 10px; color: #374151; ">Izod Impact Strength (Notched)</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; ">15 kJ/m²</td>
                      <td style="padding: 10px; color: #6b7280; ">ISO 180</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Key Benefits</h2>
              <ul>
                <li><strong style="color: #1f2937;">Superior High Gloss</strong><br>Mirror-like surface finish for aesthetic parts</li>
                <li><strong style="color: #1f2937;">Excellent Rigidity</strong><br>High modulus ensuring structural integrity</li>
                <li><strong style="color: #1f2937;">Vibrant Colorability</strong><br>Easy to color match for brand consistency</li>
                <li><strong style="color: #1f2937;">Consistent Processing</strong><br>Wide molding window with stable dimensions</li>
                <li><strong style="color: #1f2937;">Global Standard</strong><br>Widely specified by major OEMs worldwide</li>
              </ul>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Recommended Applications</h2>
              <ul style="color: #374151; line-height: 1.8;"><li style="padding: 4px 0;">TV & Monitor bezels</li>
                <li style="padding: 4px 0;">Audio equipment & speakers</li>
                <li style="padding: 4px 0;">Washing machine & refrigerator panels</li>
                <li style="padding: 4px 0;">Telephone & router housings</li>
                <li style="padding: 4px 0;">Cosmetic containers</li>
              </ul>
            </div>
          
            <div class="highlight">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Processing Guidelines</h2>
              <p style="color: #374151; line-height: 1.7;">
                Recommended melt temperature: <strong style="color: #1f2937;">200–250°C</strong><br>
                Mold temperature: <strong style="color: #1f2937;">40–80°C</strong><br>
                Pre-drying: <strong style="color: #1f2937;">80–85°C for 2–4 hours</strong> is recommended to prevent moisture defects.
              </p>
            </div>
          </div>
        `,
        isActive: true,
        categories: ['ABS Resins'],
        features: ['High Impact Resistance', 'High Clarity', 'Anti-Static'],
        applications: ['Electronics', 'Consumer Goods', 'Injection Molding']
      },
      {
        companyId: getCompanyId('INEOS Styrolution'),
        name: 'Terluran GP-22',
        slug: 'ineos-terluran-gp-22',
        shortDescription: 'Multi-purpose ABS with excellent balance of mechanical properties and processability for injection molding.',
        seoTitle: 'INEOS Terluran GP-22 – Standard ABS Resin | Shashvat Trading',
        seoDescription: 'Easy-flow ABS resin with high impact resistance and heat stability. The universal grade for cost-effective injection molding of housings and components.',
        contentHtml: `
          <div class="product-wrapper">
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Product Overview</h2>
              <p style="color: #374151; line-height: 1.7;"><strong style="color: #1f2937;">INEOS Styrolution Terluran® GP-22</strong> is an easy-flow, general-purpose ABS grade known for its high resistance to impact and heat distortion. Its excellent processability and surface quality make it a universal choice for housings in telecommunications and household appliances.
              </p>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Technical Specifications</h2>
              <div class="table-responsive">
                <table class="spec-table" style="width: 100%; border-collapse: collapse;">
                  <thead>
                    <tr style="background-color: #f1f5f9;">
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Property</th>
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Value</th>
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Test Method</th>
                    </tr>
                  </thead>
                  <tbody>
                  <tr style="background-color: #ffffff;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Melt Volume Rate (220°C / 10kg)</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">19 cm³/10min</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ISO 1133</td>
                    </tr>
                  <tr style="background-color: #f9fafb;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Charpy Impact Strength</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">24 kJ/m²</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ISO 179</td>
                    </tr>
                  <tr style="background-color: #ffffff;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Tensile Modulus</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">2300 MPa</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ISO 527</td>
                    </tr>
                  <tr style="background-color: #f9fafb;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Vicat Softening Temp (B50)</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">96°C</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ISO 306</td>
                    </tr>
                  <tr style="background-color: #ffffff;">
                      <td style="padding: 10px; color: #374151; ">Yield Stress</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; ">45 MPa</td>
                      <td style="padding: 10px; color: #6b7280; ">ISO 527</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Key Benefits</h2>
              <ul>
                <li><strong style="color: #1f2937;">High Impact Strength</strong><br>Excellent toughness for durable parts</li>
                <li><strong style="color: #1f2937;">Good Flow</strong><br>Rapid cavity filling for shorter cycle times</li>
                <li><strong style="color: #1f2937;">Dimensional Stability</strong><br>Reliable precision for assembly parts</li>
                <li><strong style="color: #1f2937;">Vibrant Coloring</strong><br>Excellent base for self-coloring</li>
                <li><strong style="color: #1f2937;">UL Rated</strong><br>Available in UL 94 HB classifications</li>
              </ul>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Recommended Applications</h2>
              <ul style="color: #374151; line-height: 1.8;"><li style="padding: 4px 0;">Telecommunication handsets</li>
                <li style="padding: 4px 0;">Computer peripherals & keyboards</li>
                <li style="padding: 4px 0;">Household appliance casings</li>
                <li style="padding: 4px 0;">Automotive interior components</li>
                <li style="padding: 4px 0;">Sanitary fittings</li>
              </ul>
            </div>
          
            <div class="highlight">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Processing Guidelines</h2>
              <p style="color: #374151; line-height: 1.7;">
                Recommended melt temperature: <strong style="color: #1f2937;">220–260°C</strong><br>
                Mold temperature: <strong style="color: #1f2937;">50–80°C</strong><br>
                Pre-drying at <strong style="color: #1f2937;">80°C for 2–4 hours</strong> is essential for surface quality.
              </p>
            </div>
          </div>
        `,
        isActive: true,
        categories: ['ABS Resins'],
        features: ['High Impact Resistance', 'Recyclable'],
        applications: ['Consumer Goods', 'Automotive', 'Electronics']
      },
      {
        companyId: getCompanyId('IRPC'),
        name: 'POLIMAXX ABS 320',
        slug: 'irpc-polimaxx-abs-320',
        shortDescription: 'High-impact ABS designed for demanding automotive interior components with heat and UV resistance.',
        seoTitle: 'POLIMAXX ABS 320 – High Impact ABS | Shashvat Trading',
        seoDescription: 'High-impact ABS resin designed for injection molding. Features superior toughness and dimensional stability for automotive and industrial parts.',
        contentHtml: `
          <div class="product-wrapper">
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Product Overview</h2>
              <p style="color: #374151; line-height: 1.7;"><strong style="color: #1f2937;">POLIMAXX® ABS 320</strong> is a high-impact grade Acrylonitrile Butadiene Styrene (ABS) resin manufactured by IRPC. It is engineered to provide superior toughness and impact resistance, making it suitable for automotive components, safety equipment, and industrial parts subjected to mechanical stress.
              </p>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Technical Specifications</h2>
              <div class="table-responsive">
                <table class="spec-table" style="width: 100%; border-collapse: collapse;">
                  <thead>
                    <tr style="background-color: #f1f5f9;">
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Property</th>
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Value</th>
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Test Method</th>
                    </tr>
                  </thead>
                  <tbody>
                  <tr style="background-color: #ffffff;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Melt Flow Rate (220°C / 10kg)</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">20 g/10min</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ISO 1133</td>
                    </tr>
                  <tr style="background-color: #f9fafb;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Notched Izod Impact (23°C)</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">28 kJ/m²</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ISO 180</td>
                    </tr>
                  <tr style="background-color: #ffffff;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Tensile Strength</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">46 MPa</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ISO 527</td>
                    </tr>
                  <tr style="background-color: #f9fafb;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Flexural Modulus</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">2200 MPa</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ISO 178</td>
                    </tr>
                  <tr style="background-color: #ffffff;">
                      <td style="padding: 10px; color: #374151; ">H.D.T. (1.8 MPa)</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; ">85°C</td>
                      <td style="padding: 10px; color: #6b7280; ">ISO 75</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Key Benefits</h2>
              <ul>
                <li><strong style="color: #1f2937;">Superior Toughness</strong><br>High impact strength for durable applications</li>
                <li><strong style="color: #1f2937;">Dimensional Stability</strong><br>Low shrinkage and warpage</li>
                <li><strong style="color: #1f2937;">Good Processability</strong><br>Easy to mold leading to high productivity</li>
                <li><strong style="color: #1f2937;">Paintability</strong><br>Excellent surface for painting and plating</li>
                <li><strong style="color: #1f2937;">Chemical Resistance</strong><br>Resists common household cleaners and oils</li>
              </ul>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Recommended Applications</h2>
              <ul style="color: #374151; line-height: 1.8;"><li style="padding: 4px 0;">Automotive interior parts</li>
                <li style="padding: 4px 0;">Motorcycle components</li>
                <li style="padding: 4px 0;">Safety helmets</li>
                <li style="padding: 4px 0;">Vacuum cleaner bodies</li>
                <li style="padding: 4px 0;">Furniture components</li>
              </ul>
            </div>
          
            <div class="highlight">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Processing Guidelines</h2>
              <p style="color: #374151; line-height: 1.7;">
                Recommended melt temperature: <strong style="color: #1f2937;">210–250°C</strong><br>
                Mold temperature: <strong style="color: #1f2937;">40–80°C</strong><br>
                Dry at <strong style="color: #1f2937;">80–90°C for 2–4 hours</strong> before processing to ensure surface quality.
              </p>
            </div>
          </div>
        `,
        isActive: true,
        categories: ['ABS Resins'],
        features: ['High Impact Resistance', 'Heat Resistant', 'UV Stabilized'],
        applications: ['Automotive', 'Consumer Goods']
      },
      // PVC Products (2)
      {
        companyId: getCompanyId('Braskem'),
        name: 'Braskem PVC S67',
        slug: 'braskem-pvc-s67',
        shortDescription: 'Suspension PVC resin designed for rigid pipe and profile extrusion with excellent weathering performance.',
        seoTitle: 'Braskem PVC S67 – Suspension PVC Resin | Shashvat Trading',
        seoDescription: 'Suspension PVC resin designed for rigid extrusion. Features excellent thermal stability, fast fusion, and good initial color. Ideal for pipes and profiles.',
        contentHtml: `
          <div class="product-wrapper">
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Product Overview</h2>
              <p style="color: #374151; line-height: 1.7;"><strong style="color: #1f2937;">Braskem PVC S67</strong> is a medium molecular weight suspension Polyvinyl Chloride (PVC) homopolymer. It is specifically designed for rigid extrusion applications where consistent particle size distribution ensures rapid fusion and excellent surface finish.
              </p>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Technical Specifications</h2>
              <div class="table-responsive">
                <table class="spec-table" style="width: 100%; border-collapse: collapse;">
                  <thead>
                    <tr style="background-color: #f1f5f9;">
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Property</th>
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Value</th>
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Test Method</th>
                    </tr>
                  </thead>
                  <tbody>
                  <tr style="background-color: #ffffff;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">K-Value</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">67</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">DIN 53726</td>
                    </tr>
                  <tr style="background-color: #f9fafb;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Inherent Viscosity</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">0.92 dl/g</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ASTM D1243</td>
                    </tr>
                  <tr style="background-color: #ffffff;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Apparent Bulk Density</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">0.56 g/cm³</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ASTM D1895</td>
                    </tr>
                  <tr style="background-color: #f9fafb;">
                      <td style="padding: 10px; color: #374151; ">Porosity (DOP)</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; ">22 %</td>
                      <td style="padding: 10px; color: #6b7280; ">ASTM D3367</td>
                    </tr>
                  <tr><td>Volatile Matter</td><td>< 0.3 %</td><td>ASTM D3030</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Key Benefits</h2>
              <ul>
                <li><strong style="color: #1f2937;">Excellent Thermal Stability</strong><br>Wide processing window without degradation</li>
                <li><strong style="color: #1f2937;">Consistent Particle Size</strong><br>Ensures uniform mixing and fusion</li>
                <li><strong style="color: #1f2937;">Good Initial Color</strong><br>Ideal for white and light-colored profiles</li>
                <li><strong style="color: #1f2937;">High Bulk Density</strong><br>Maximizes extruder output</li>
                <li><strong style="color: #1f2937;">Versatile Performance</strong><br>Suitable for both pipe and profile extrusion</li>
              </ul>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Recommended Applications</h2>
              <ul style="color: #374151; line-height: 1.8;"><li style="padding: 4px 0;">Rigid pressure pipes (water/sewage)</li>
                <li style="padding: 4px 0;">Window & door profiles</li>
                <li style="padding: 4px 0;">Electrical conduits</li>
                <li style="padding: 4px 0;">Technical profiles & trunking</li>
                <li style="padding: 4px 0;">Rigid fittings</li>
              </ul>
            </div>
          
            <div class="highlight">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Processing Guidelines</h2>
              <p style="color: #374151; line-height: 1.7;">
                Recommended processing temperature: <strong style="color: #1f2937;">170–190°C</strong><br>
                Ensure adequate stabilization system (Pb, Ca/Zn, or Tin based).<br>
                Compatible with twin-screw extruders.
              </p>
            </div>
          </div>
        `,
        isActive: true,
        categories: ['PVC'],
        features: ['Flame Retardant', 'Chemical Resistant', 'Weather Resistant'],
        applications: ['Construction', 'Pipes & Fittings']
      },
      {
        companyId: getCompanyId('Formosa Plastics'),
        name: 'Formosa PVC 6650',
        slug: 'formosa-pvc-6650',
        shortDescription: 'General purpose PVC for flexible applications offering excellent processability and compound compatibility.',
        seoTitle: 'Formosa PVC 6650 – General Purpose PVC | Shashvat Trading',
        seoDescription: 'General purpose suspension PVC resin. Versatile grade suitable for both flexible and rigid applications, offering good plasticizer absorption and clarity.',
        contentHtml: `
          <div class="product-wrapper">
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Product Overview</h2>
              <p style="color: #374151; line-height: 1.7;"><strong style="color: #1f2937;">Formosa PVC 6650</strong> is a general-purpose suspension PVC resin suitable for a wide variety of processing methods. It is characterized by its high purity, good plasticizer absorption, and ease of processing, making it a preferred choice for flexible compounds and film applications.
              </p>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Technical Specifications</h2>
              <div class="table-responsive">
                <table class="spec-table" style="width: 100%; border-collapse: collapse;">
                  <thead>
                    <tr style="background-color: #f1f5f9;">
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Property</th>
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Value</th>
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Test Method</th>
                    </tr>
                  </thead>
                  <tbody>
                  <tr style="background-color: #ffffff;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">K-Value</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">66</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">JIS K-6721</td>
                    </tr>
                  <tr style="background-color: #f9fafb;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Average Degree of Polymerization</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">1050</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">JIS K-6721</td>
                    </tr>
                  <tr style="background-color: #ffffff;">
                      <td style="padding: 10px; color: #374151; ">Apparent Density</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; ">0.54 g/cm³</td>
                      <td style="padding: 10px; color: #6b7280; ">ASTM D1895</td>
                    </tr>
                  <tr><td>Volatile Component</td><td>< 0.3%</td><td>ASTM D3030</td></tr>
                  <tr><td>Impurity Particles</td><td>< 20</td><td>FPC Method</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Key Benefits</h2>
              <ul>
                <li><strong style="color: #1f2937;">High Plasticizer Absorption</strong><br>Allows for dry high-filler loading compounds</li>
                <li><strong style="color: #1f2937;">Excellent Clarity</strong><br>Suitable for transparent films and tubing</li>
                <li><strong style="color: #1f2937;">Low Gel Content</strong><br>Ensures smooth surface finish in end products</li>
                <li><strong style="color: #1f2937;">Uniform Porosity</strong><br>Facilitates rapid dry-blending cycles</li>
                <li><strong style="color: #1f2937;">Consistent Quality</strong><br>Reliable batch-to-batch performance</li>
              </ul>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Recommended Applications</h2>
              <ul style="color: #374151; line-height: 1.8;"><li style="padding: 4px 0;">Flexible hoses & tubing</li>
                <li style="padding: 4px 0;">Wire & cable insulation</li>
                <li style="padding: 4px 0;">Calendered sheets & films</li>
                <li style="padding: 4px 0;">Artificial leather</li>
                <li style="padding: 4px 0;">Footwear soles</li>
              </ul>
            </div>
          
            <div class="highlight">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Processing Guidelines</h2>
              <p style="color: #374151; line-height: 1.7;">
                Recommended mixing temperature: <strong style="color: #1f2937;">100–120°C</strong> (for dry blends)<br>
                Processing temperature: <strong style="color: #1f2937;">150–180°C</strong> depending on formulation.<br>
                Pre-heating of resin not typically required.
              </p>
            </div>
          </div>
        `,
        isActive: true,
        categories: ['PVC'],
        features: ['Flame Retardant', 'Chemical Resistant'],
        applications: ['Consumer Goods', 'Medical']
      },
      // Polystyrene Products (3)
      {
        companyId: getCompanyId('Formosa Plastics'),
        name: 'Formosa GPPS 535N',
        slug: 'formosa-gpps-535n-polystyrene',
        shortDescription: 'Crystal-clear general purpose polystyrene for transparent packaging and disposables with FDA approval.',
        seoTitle: 'Formosa GPPS 535N – Crystal Polystyrene | Shashvat Trading',
        seoDescription: 'Crystal clear general purpose polystyrene (GPPS). Offers superior optical properties and flow for injection molding of transparent containers and medical ware.',
        contentHtml: `
          <div class="product-wrapper">
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Product Overview</h2>
              <p style="color: #374151; line-height: 1.7;"><strong style="color: #1f2937;">Formosa GPPS 535N</strong> is a crystal-grade general purpose polystyrene (GPPS) offering exceptional transparency and high gloss. It is designed for injection molding applications where optical clarity and aesthetic appeal are critical, such as in premium packaging and household goods.
              </p>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Technical Specifications</h2>
              <div class="table-responsive">
                <table class="spec-table" style="width: 100%; border-collapse: collapse;">
                  <thead>
                    <tr style="background-color: #f1f5f9;">
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Property</th>
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Value</th>
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Test Method</th>
                    </tr>
                  </thead>
                  <tbody>
                  <tr style="background-color: #ffffff;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Melt Flow Rate (200°C / 5kg)</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">5.0 g/10min</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ASTM D1238</td>
                    </tr>
                  <tr style="background-color: #f9fafb;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Vicat Softening Point</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">98°C</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ASTM D1525</td>
                    </tr>
                  <tr style="background-color: #ffffff;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Tensile Strength</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">420 kg/cm²</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ASTM D638</td>
                    </tr>
                  <tr style="background-color: #f9fafb;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Flexural Strength</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">850 kg/cm²</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ASTM D790</td>
                    </tr>
                  <tr style="background-color: #ffffff;">
                      <td style="padding: 10px; color: #374151; ">Light Transmittance</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; ">90%</td>
                      <td style="padding: 10px; color: #6b7280; ">ASTM D1003</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Key Benefits</h2>
              <ul>
                <li><strong style="color: #1f2937;">Sparkling Clarity</strong><br>Glass-like transparency for premium aesthetics</li>
                <li><strong style="color: #1f2937;">Good Moldability</strong><br>Excellent flow for intricate designs</li>
                <li><strong style="color: #1f2937;">High Rigidity</strong><br>Maintains shape in thin-walled parts</li>
                <li><strong style="color: #1f2937;">FDA Compliant</strong><br>Approved for food contact applications</li>
                <li><strong style="color: #1f2937;">Cost Effective</strong><br>Specific gravity low offering more parts per kg</li>
              </ul>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Recommended Applications</h2>
              <ul style="color: #374151; line-height: 1.8;"><li style="padding: 4px 0;">Food storage containers</li>
                <li style="padding: 4px 0;">Disposable cutlery</li>
                <li style="padding: 4px 0;">CD/Jewel cases</li>
                <li style="padding: 4px 0;">Laboratory petri dishes</li>
                <li style="padding: 4px 0;">Display stands & giftware</li>
              </ul>
            </div>
          
            <div class="highlight">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Processing Guidelines</h2>
              <p style="color: #374151; line-height: 1.7;">
                Recommended melt temperature: <strong style="color: #1f2937;">180–230°C</strong><br>
                Mold temperature: <strong style="color: #1f2937;">30–50°C</strong><br>
                Minimize residence time to prevent yellowing.
              </p>
            </div>
          </div>
        `,
        isActive: true,
        categories: ['Polystyrene (PS)'],
        features: ['High Clarity', 'Food Grade', 'Recyclable'],
        applications: ['Packaging', 'Consumer Goods', 'Medical']
      },
      {
        companyId: getCompanyId('INEOS Styrolution'),
        name: 'Styrolution HIPS 486N',
        slug: 'ineos-styrolution-hips-486n-polystyrene',
        shortDescription: 'High-impact polystyrene for refrigerator linings and packaging requiring excellent impact strength.',
        seoTitle: 'Styrolution HIPS 486N – High Impact Polystyrene | Shashvat Trading',
        seoDescription: 'High impact polystyrene (HIPS) designed for demanding extrusion and molding. Features superior toughness, stress crack resistance, and matt finish.',
        contentHtml: `
          <div class="product-wrapper">
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Product Overview</h2>
              <p style="color: #374151; line-height: 1.7;"><strong style="color: #1f2937;">Styrolution™ PS HIPS 486N</strong> is a high-impact polystyrene grade designed for extrusion and thermoforming applications that require superior resistance to environmental stress cracking (ESCR). It is the industry standard for refrigerator liners and other demanding durable goods.
              </p>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Technical Specifications</h2>
              <div class="table-responsive">
                <table class="spec-table" style="width: 100%; border-collapse: collapse;">
                  <thead>
                    <tr style="background-color: #f1f5f9;">
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Property</th>
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Value</th>
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Test Method</th>
                    </tr>
                  </thead>
                  <tbody>
                  <tr style="background-color: #ffffff;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Melt Volume Rate (200°C / 5kg)</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">3.5 cm³/10min</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ISO 1133</td>
                    </tr>
                  <tr style="background-color: #f9fafb;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Charpy Notched Impact (23°C)</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">9 kJ/m²</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ISO 179</td>
                    </tr>
                  <tr style="background-color: #ffffff;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Tensile Modulus</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">1800 MPa</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ISO 527</td>
                    </tr>
                  <tr style="background-color: #f9fafb;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Vicat Softening Temp (B50)</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">92°C</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ISO 306</td>
                    </tr>
                  <tr style="background-color: #ffffff;">
                      <td style="padding: 10px; color: #374151; ">Yield Stress</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; ">22 MPa</td>
                      <td style="padding: 10px; color: #6b7280; ">ISO 527</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Key Benefits</h2>
              <ul>
                <li><strong style="color: #1f2937;">Superior ESCR</strong><br>Excellent resistance to oils and blowing agents</li>
                <li><strong style="color: #1f2937;">High Toughness</strong><br>Withstands impact even at low temperatures</li>
                <li><strong style="color: #1f2937;">Deep Drawability</strong><br>Ideal for complex thermoformed parts</li>
                <li><strong style="color: #1f2937;">Matt Finish</strong><br>Premium surface apperance</li>
                <li><strong style="color: #1f2937;">Processing Stability</strong><br>Consistent extrusion performance</li>
              </ul>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Recommended Applications</h2>
              <ul style="color: #374151; line-height: 1.8;"><li style="padding: 4px 0;">Refrigerator inner liners & door liners</li>
                <li style="padding: 4px 0;">Dairy packaging & yogurt cups</li>
                <li style="padding: 4px 0;">Disposable tableware</li>
                <li style="padding: 4px 0;">Sanitary ware</li>
                <li style="padding: 4px 0;">Industrial housings</li>
              </ul>
            </div>
          
            <div class="highlight">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Processing Guidelines</h2>
              <p style="color: #374151; line-height: 1.7;">
                Recommended melt temperature: <strong style="color: #1f2937;">200–240°C</strong><br>
                Mold temperature: <strong style="color: #1f2937;">20–50°C</strong><br>
                Vacuum forming temperature: <strong style="color: #1f2937;">130–150°C</strong> for sheet.
              </p>
            </div>
          </div>
        `,
        isActive: true,
        categories: ['Polystyrene (PS)'],
        features: ['High Impact Resistance', 'Food Grade', 'Recyclable'],
        applications: ['Consumer Goods', 'Packaging', 'Electronics']
      },
      {
        companyId: getCompanyId('Trinseo'),
        name: 'Styron 678E',
        slug: 'trinseo-styron-678e-polystyrene',
        shortDescription: 'Crystal polystyrene with exceptional optical clarity for demanding applications.',
        seoTitle: 'Styron 678E – General Purpose Polystyrene | Shashvat Trading',
        seoDescription: 'General purpose polystyrene resin characterized by excellent flow and clarity. Ideal for thin-wall injection molding and complex transparent parts.',
        contentHtml: `
          <div class="product-wrapper">
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Product Overview</h2>
              <p style="color: #374151; line-height: 1.7;"><strong style="color: #1f2937;">Styron™ 678E</strong> is high-flow general purpose polystyrene (GPPS) resin designed for injection molding. It combines excellent processability with good mechanical strength and high clarity, making it suitable for high-speed production of thin-walled parts.
              </p>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Technical Specifications</h2>
              <div class="table-responsive">
                <table class="spec-table" style="width: 100%; border-collapse: collapse;">
                  <thead>
                    <tr style="background-color: #f1f5f9;">
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Property</th>
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Value</th>
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Test Method</th>
                    </tr>
                  </thead>
                  <tbody>
                  <tr style="background-color: #ffffff;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Melt Flow Rate (200°C / 5kg)</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">10.0 g/10min</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ASTM D1238</td>
                    </tr>
                  <tr style="background-color: #f9fafb;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Specific Gravity</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">1.04</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ASTM D792</td>
                    </tr>
                  <tr style="background-color: #ffffff;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Tensile Strength</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">45 MPa</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ASTM D638</td>
                    </tr>
                  <tr style="background-color: #f9fafb;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Flexural Modulus</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">3200 MPa</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ASTM D790</td>
                    </tr>
                  <tr style="background-color: #ffffff;">
                      <td style="padding: 10px; color: #374151; ">Vicat Softening Temperature</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; ">96°C</td>
                      <td style="padding: 10px; color: #6b7280; ">ASTM D1525</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Key Benefits</h2>
              <ul>
                <li><strong style="color: #1f2937;">High Flow Rate</strong><br>Enables filling of complex and thin-wall molds</li>
                <li><strong style="color: #1f2937;">Fast Cycle Times</strong><br>Increases manufacturing productivity</li>
                <li><strong style="color: #1f2937;">Excellent Clarity</strong><br>Suitable for see-through applications</li>
                <li><strong style="color: #1f2937;">Stiffness</strong><br>Rigid parts with good dimensional stability</li>
                <li><strong style="color: #1f2937;">FDA Compliant</strong><br>Safe for food contact uses</li>
              </ul>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Recommended Applications</h2>
              <ul style="color: #374151; line-height: 1.8;"><li style="padding: 4px 0;">Household containers & boxes</li>
                <li style="padding: 4px 0;">Office accessories (rulers, trays)</li>
                <li style="padding: 4px 0;">Packaging lids & caps</li>
                <li style="padding: 4px 0;">Medical labware</li>
                <li style="padding: 4px 0;">Toys & novelties</li>
              </ul>
            </div>
          
            <div class="highlight">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Processing Guidelines</h2>
              <p style="color: #374151; line-height: 1.7;">
                Recommended melt temperature: <strong style="color: #1f2937;">180–240°C</strong><br>
                Mold temperature: <strong style="color: #1f2937;">30–60°C</strong><br>
                No drying required unless resin has been exposed to high humidity.
              </p>
            </div>
          </div>
        `,
        isActive: true,
        categories: ['Polystyrene (PS)'],
        features: ['High Clarity', 'Food Grade', 'Low Odor'],
        applications: ['Packaging', 'Consumer Goods']
      },
      // Engineering Plastics (4)
      {
        companyId: getCompanyId('BASF'),
        name: 'Ultramid B3WG6',
        slug: 'basf-ultramid-b3wg6-polyamide',
        shortDescription: '30% glass fiber reinforced polyamide 6 for high-strength structural automotive and industrial parts.',
        seoTitle: 'BASF Ultramid B3WG6 – Glass Filled Nylon 6 | Shashvat Trading',
        seoDescription: '30% glass fiber reinforced Polyamide 6 (PA6). Delivers exceptional stiffness, strength, and heat resistance for structural automotive and industrial parts.',
        contentHtml: `
          <div class="product-wrapper">
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Product Overview</h2>
              <p style="color: #374151; line-height: 1.7;"><strong style="color: #1f2937;">BASF Ultramid® B3WG6</strong> is a 30% glass fiber reinforced Polyamide 6 (Nylon 6) injection molding grade. Engineered for high-load structural applications, it offers an exceptional combination of stiffness, mechanical strength, and thermal stability usage in demanding automotive and industrial environments.
              </p>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Technical Specifications</h2>
              <div class="table-responsive">
                <table class="spec-table" style="width: 100%; border-collapse: collapse;">
                  <thead>
                    <tr style="background-color: #f1f5f9;">
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Property</th>
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Value</th>
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Test Method</th>
                    </tr>
                  </thead>
                  <tbody>
                  <tr style="background-color: #ffffff;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Glass Fiber Content</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">30%</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ISO 3451</td>
                    </tr>
                  <tr style="background-color: #f9fafb;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Tensile Strength</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">185 MPa</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ISO 527</td>
                    </tr>
                  <tr style="background-color: #ffffff;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Tensile Modulus</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">9500 MPa</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ISO 527</td>
                    </tr>
                  <tr style="background-color: #f9fafb;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">HDT (1.80 MPa)</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">200°C</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ISO 75</td>
                    </tr>
                  <tr style="background-color: #ffffff;">
                      <td style="padding: 10px; color: #374151; ">Charpy Impact (23°C)</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; ">85 kJ/m²</td>
                      <td style="padding: 10px; color: #6b7280; ">ISO 179</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Key Benefits</h2>
              <ul>
                <li><strong style="color: #1f2937;">Extreme Rigidity</strong><br>High modulus for metal replacement applications</li>
                <li><strong style="color: #1f2937;">High Heat Resistance</strong><br>Maintains properties at elevated temperatures (up to 200°C short term)</li>
                <li><strong style="color: #1f2937;">Chemical Resistance</strong><br>Excellent resistance to fuels, oils, and greases</li>
                <li><strong style="color: #1f2937;">Fatigue Endurance</strong><br>Withstands repeated dynamic loading</li>
                <li><strong style="color: #1f2937;">Dimensional Accuracy</strong><br>Low thermal expansion coefficient</li>
              </ul>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Recommended Applications</h2>
              <ul style="color: #374151; line-height: 1.8;"><li style="padding: 4px 0;">Automotive air intake manifolds</li>
                <li style="padding: 4px 0;">Engine covers & structural brackets</li>
                <li style="padding: 4px 0;">Power tool housings</li>
                <li style="padding: 4px 0;">Industrial gears & bearings</li>
                <li style="padding: 4px 0;">Electrical bobbins & switchgear</li>
              </ul>
            </div>
          
            <div class="highlight">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Processing Guidelines</h2>
              <p style="color: #374151; line-height: 1.7;">
                Recommended melt temperature: <strong style="color: #1f2937;">270–290°C</strong><br>
                Mold temperature: <strong style="color: #1f2937;">80–90°C</strong><br>
                <strong style="color: #1f2937;">CRITICAL:</strong> Material must be dried to &lt;0.1% moisture content (80°C for 4 hours) before processing.
              </p>
            </div>
          </div>
        `,
        isActive: true,
        categories: ['Engineering Plastics'],
        features: ['High Impact Resistance', 'Chemical Resistant', 'Flame Retardant', 'Heat Resistant'],
        applications: ['Automotive', 'Electronics']
      },
      {
        companyId: getCompanyId('SABIC'),
        name: 'LEXAN 141R',
        slug: 'sabic-lexan-141r-polycarbonate',
        shortDescription: 'General purpose polycarbonate offering exceptional impact strength and optical clarity for transparent applications.',
        seoTitle: 'SABIC LEXAN 141R – Polycarbonate Resin | Shashvat Trading',
        seoDescription: 'General purpose Polycarbonate (PC) resin offering excellent clarity, high impact strength, and heat resistance. Ideal for molding glazing and intricate parts.',
        contentHtml: `
          <div class="product-wrapper">
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Product Overview</h2>
              <p style="color: #374151; line-height: 1.7;"><strong style="color: #1f2937;">SABIC LEXAN™ 141R</strong> is a medium-viscosity, multi-purpose polycarbonate resin containing a mold release agent. It delivers the signature LEXAN toughness—virtually unbreakable impact strength—combined with crystal-clear transparency and high heat resistance.
              </p>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Technical Specifications</h2>
              <div class="table-responsive">
                <table class="spec-table" style="width: 100%; border-collapse: collapse;">
                  <thead>
                    <tr style="background-color: #f1f5f9;">
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Property</th>
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Value</th>
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Test Method</th>
                    </tr>
                  </thead>
                  <tbody>
                  <tr style="background-color: #ffffff;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Melt Flow Rate (300°C / 1.2kg)</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">12 g/10min</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ASTM D1238</td>
                    </tr>
                  <tr style="background-color: #f9fafb;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Density</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">1.20 g/cm³</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ASTM D792</td>
                    </tr>
                  <tr style="background-color: #ffffff;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Notched Izod Impact</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">800 J/m</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ASTM D256</td>
                    </tr>
                  <tr style="background-color: #f9fafb;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Light Transmission</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">88-90%</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ASTM D1003</td>
                    </tr>
                  <tr style="background-color: #ffffff;">
                      <td style="padding: 10px; color: #374151; ">HDT (1.82 MPa)</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; ">125°C</td>
                      <td style="padding: 10px; color: #6b7280; ">ASTM D648</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Key Benefits</h2>
              <ul>
                <li><strong style="color: #1f2937;">Virtually Unbreakable</strong><br>Outstanding impact resistance for safety applications</li>
                <li><strong style="color: #1f2937;">High Transparency</strong><br>Optical quality clarity comparable to glass</li>
                <li><strong style="color: #1f2937;">Self-Extinguishing</strong><br>Inherently flame retardant properties</li>
                <li><strong style="color: #1f2937;">Thermal Stability</strong><br>Performs reliably in high temperature environments</li>
                <li><strong style="color: #1f2937;">Easy Release</strong><br>Contains mold release for efficient cycling</li>
              </ul>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Recommended Applications</h2>
              <ul style="color: #374151; line-height: 1.8;"><li style="padding: 4px 0;">Safety helmets & visors</li>
                <li style="padding: 4px 0;">Electrical connectors & housings</li>
                <li style="padding: 4px 0;">Automotive lighting lenses</li>
                <li style="padding: 4px 0;">Medical device components</li>
                <li style="padding: 4px 0;">Transparent instrument covers</li>
              </ul>
            </div>
          
            <div class="highlight">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Processing Guidelines</h2>
              <p style="color: #374151; line-height: 1.7;">
                Recommended melt temperature: <strong style="color: #1f2937;">280–310°C</strong><br>
                Mold temperature: <strong style="color: #1f2937;">70–95°C</strong><br>
                Drying at <strong style="color: #1f2937;">120°C for 2–4 hours</strong> is mandatory to prevent hydrolysis and loss of properties.
              </p>
            </div>
          </div>
        `,
        isActive: true,
        categories: ['Engineering Plastics', 'PC (Polycarbonate)'],
        features: ['High Impact Resistance', 'High Clarity', 'Flame Retardant'],
        applications: ['Electronics', 'Automotive', 'Consumer Goods']
      },
      {
        companyId: getCompanyId('BASF'),
        name: 'Ultradur B4520',
        slug: 'basf-ultradur-b4520-pbt',
        shortDescription: 'PBT polyester for electrical connectors and automotive parts requiring excellent dimensional stability.',
        seoTitle: 'BASF Ultradur B4520 – PBT Polyester Resin | Shashvat Trading',
        seoDescription: 'Unreinforced PBT injection molding grade offering excellent flow, fast crystallization, and dimensional stability. Ideal for electrical connectors and precision parts.',
        contentHtml: `
          <div class="product-wrapper">
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Product Overview</h2>
              <p style="color: #374151; line-height: 1.7;"><strong style="color: #1f2937;">BASF Ultradur® B4520</strong> is a medium-viscosity, unreinforced Polybutylene Terephthalate (PBT) injection molding grade. It is characterized by its high flowability and rapid crystallization rate, which enables short cycle times for mass production of precision components.
              </p>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Technical Specifications</h2>
              <div class="table-responsive">
                <table class="spec-table" style="width: 100%; border-collapse: collapse;">
                  <thead>
                    <tr style="background-color: #f1f5f9;">
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Property</th>
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Value</th>
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Test Method</th>
                    </tr>
                  </thead>
                  <tbody>
                  <tr style="background-color: #ffffff;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Melt Volume Rate (250°C / 2.16kg)</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">22 cm³/10min</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ISO 1133</td>
                    </tr>
                  <tr style="background-color: #f9fafb;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Density</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">1.30 g/cm³</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ISO 1183</td>
                    </tr>
                  <tr style="background-color: #ffffff;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Tensile Modulus</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">2600 MPa</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ISO 527</td>
                    </tr>
                  <tr style="background-color: #f9fafb;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Melting Temperature</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">223°C</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ISO 11357</td>
                    </tr>
                  <tr style="background-color: #ffffff;">
                      <td style="padding: 10px; color: #374151; ">Water Absorption</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; ">0.4%</td>
                      <td style="padding: 10px; color: #6b7280; ">ISO 62</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Key Benefits</h2>
              <ul>
                <li><strong style="color: #1f2937;">Fast Cycling</strong><br>Rapid solidification reduces production time</li>
                <li><strong style="color: #1f2937;">Dimensional Stability</strong><br>Low moisture absorption ensures precise fits</li>
                <li><strong style="color: #1f2937;">Electrical Properties</strong><br>High electrical insulation and tracking resistance</li>
                <li><strong style="color: #1f2937;">Chemical Resistance</strong><br>Resistant to automotive fluids and solvents</li>
                <li><strong style="color: #1f2937;">Surface Finish</strong><br>Produces smooth, hard, and glossy parts</li>
              </ul>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Recommended Applications</h2>
              <ul style="color: #374151; line-height: 1.8;"><li style="padding: 4px 0;">Automotive connectors & sensors</li>
                <li style="padding: 4px 0;">Electrical switchgear components</li>
                <li style="padding: 4px 0;">Appliance control knobs</li>
                <li style="padding: 4px 0;">Lighting sockets</li>
                <li style="padding: 4px 0;">Functional assembly parts</li>
              </ul>
            </div>
          
            <div class="highlight">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Processing Guidelines</h2>
              <p style="color: #374151; line-height: 1.7;">
                Recommended melt temperature: <strong style="color: #1f2937;">250–270°C</strong><br>
                Mold temperature: <strong style="color: #1f2937;">40–80°C</strong><br>
                Drying: <strong style="color: #1f2937;">100–120°C for 4 hours</strong>. Moisture content must be &lt;0.04% before molding.
              </p>
            </div>
          </div>
        `,
        isActive: true,
        categories: ['Engineering Plastics'],
        features: ['Chemical Resistant', 'Heat Resistant', 'Flame Retardant'],
        applications: ['Electronics', 'Automotive']
      },
      {
        companyId: getCompanyId('LG Chem'),
        name: 'LUPOX GP-1100',
        slug: 'lg-chem-lupox-gp-1100-pbt',
        shortDescription: 'General purpose PBT for injection molding with excellent mechanical properties and fast molding cycles.',
        seoTitle: 'LG Chem LUPOX GP-1100 – General Purpose PBT | Shashvat Trading',
        seoDescription: 'General purpose PBT resin designed for injection molding. features excellent mechanical properties, electrical insulation, and chemical resistance.',
        contentHtml: `
          <div class="product-wrapper">
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Product Overview</h2>
              <p style="color: #374151; line-height: 1.7;"><strong style="color: #1f2937;">LG Chem LUPOX GP-1100</strong> is an unreinforced general-purpose Polybutylene Terephthalate (PBT) resin. It provides a reliable balance of mechanical strength, thermal endurance, and electrical insulation, making it a versatile choice for electrical and industrial components.
              </p>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Technical Specifications</h2>
              <div class="table-responsive">
                <table class="spec-table" style="width: 100%; border-collapse: collapse;">
                  <thead>
                    <tr style="background-color: #f1f5f9;">
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Property</th>
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Value</th>
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Test Method</th>
                    </tr>
                  </thead>
                  <tbody>
                  <tr style="background-color: #ffffff;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Specific Gravity</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">1.31</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ASTM D792</td>
                    </tr>
                  <tr style="background-color: #f9fafb;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Tensile Strength</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">58 MPa</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ASTM D638</td>
                    </tr>
                  <tr style="background-color: #ffffff;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Flexural Modulus</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">2400 MPa</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ASTM D790</td>
                    </tr>
                  <tr style="background-color: #f9fafb;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Dielectric Strength</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">20 kV/mm</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ASTM D149</td>
                    </tr>
                  <tr style="background-color: #ffffff;">
                      <td style="padding: 10px; color: #374151; ">HDT (0.45 MPa)</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; ">150°C</td>
                      <td style="padding: 10px; color: #6b7280; ">ASTM D648</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Key Benefits</h2>
              <ul>
                <li><strong style="color: #1f2937;">Electrical Insulation</strong><br>Excellent dielectric strength for electronic parts</li>
                <li><strong style="color: #1f2937;">Good Stiffness</strong><br>Maintains structural form under load</li>
                <li><strong style="color: #1f2937;">Chemical Resilience</strong><br>Resists attack from fuels, oils, and weak acids</li>
                <li><strong style="color: #1f2937;">Low Moisture Absorption</strong><br>Stable performance in humid environments</li>
                <li><strong style="color: #1f2937;">Friction Coefficient</strong><br>Naturally low friction for sliding parts</li>
              </ul>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Recommended Applications</h2>
              <ul style="color: #374151; line-height: 1.8;"><li style="padding: 4px 0;">Relay cases & bobbin housings</li>
                <li style="padding: 4px 0;">Automotive ignition components</li>
                <li style="padding: 4px 0;">Keyboards & switches</li>
                <li style="padding: 4px 0;">Cooling fans</li>
                <li style="padding: 4px 0;">Industrial clips & fasteners</li>
              </ul>
            </div>
          
            <div class="highlight">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Processing Guidelines</h2>
              <p style="color: #374151; line-height: 1.7;">
                Recommended melt temperature: <strong style="color: #1f2937;">235–255°C</strong><br>
                Mold temperature: <strong style="color: #1f2937;">60–80°C</strong><br>
                Pre-drying at <strong style="color: #1f2937;">120°C for 3–5 hours</strong> is strictly recommended.
              </p>
            </div>
          </div>
        `,
        isActive: true,
        categories: ['Engineering Plastics'],
        features: ['Heat Resistant', 'Chemical Resistant', 'Recyclable'],
        applications: ['Electronics', 'Consumer Goods', 'Injection Molding']
      },
      // PET Products (2)
      {
        companyId: getCompanyId('Reliance Industries'),
        name: 'Relpet G5801',
        slug: 'reliance-relpet-g5801',
        shortDescription: 'Bottle-grade PET specifically designed for carbonated soft drink containers with excellent clarity and gas barrier.',
        seoTitle: 'Relpet G5801 – Bottle Grade PET | Shashvat Trading',
        seoDescription: 'Filament and bottle grade PET resin. Designed for CSD bottles with excellent gas barrier, clarity, and stress crack resistance.',
        contentHtml: `
          <div class="product-wrapper">
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Product Overview</h2>
              <p style="color: #374151; line-height: 1.7;"><strong style="color: #1f2937;">Relpet® G5801</strong> is a high-intrinsic viscosity bottle-grade Polyethylene Terephthalate (PET) copolymer. It is specially formulated for the manufacture of bottles for Carbonated Soft Drinks (CSD), delivering excellent strength and gas retention properties to preserve carbonation.
              </p>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Technical Specifications</h2>
              <div class="table-responsive">
                <table class="spec-table" style="width: 100%; border-collapse: collapse;">
                  <thead>
                    <tr style="background-color: #f1f5f9;">
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Property</th>
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Value</th>
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Test Method</th>
                    </tr>
                  </thead>
                  <tbody>
                  <tr style="background-color: #ffffff;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Intrinsic Viscosity (IV)</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">0.80 ± 0.02 dl/g</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ASTM D4603</td>
                    </tr>
                  <tr><td>Acetaldehyde (AA)</td><td>< 1.0 ppm</td><td>GC Method</td></tr>
                  <tr style="background-color: #f9fafb;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Melting Point</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">248 ± 2°C</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">DSC</td>
                    </tr>
                  <tr style="background-color: #ffffff;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Crystallinity</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">> 45 %</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">Density Method</td>
                    </tr>
                  <tr style="background-color: #f9fafb;">
                      <td style="padding: 10px; color: #374151; ">Color L*</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; ">> 85</td>
                      <td style="padding: 10px; color: #6b7280; ">HunterLab</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Key Benefits</h2>
              <ul>
                <li><strong style="color: #1f2937;">Excellent Gas Barrier</strong><br>Preserves CO2 for longer shelf life</li>
                <li><strong style="color: #1f2937;">Low Acetaldehyde</strong><br>Ensures pure taste profile</li>
                <li><strong style="color: #1f2937;">High Stress Crack Resistance</strong><br>Prevents bottle failure under pressure</li>
                <li><strong style="color: #1f2937;">Process Stability</strong><br>Wide processing window in ISBM machines</li>
                <li><strong style="color: #1f2937;">High Clarity & Sparkle</strong><br>Premium shelf appeal</li>
              </ul>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Recommended Applications</h2>
              <ul style="color: #374151; line-height: 1.8;"><li style="padding: 4px 0;">Carbonated Soft Drink (CSD) bottles</li>
                <li style="padding: 4px 0;">Sparkling water containers</li>
                <li style="padding: 4px 0;">Pharmaceutical bottles</li>
                <li style="padding: 4px 0;">Agro-chemical packaging</li>
                <li style="padding: 4px 0;">APET sheet extrusion</li>
              </ul>
            </div>
          
            <div class="highlight">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Processing Guidelines</h2>
              <p style="color: #374151; line-height: 1.7;">
                Recommended melt temperature: <strong style="color: #1f2937;">280–295°C</strong><br>
                Drying: <strong style="color: #1f2937;">160–180°C for 4–6 hours</strong>. Dew point -40°C.<br>
                Moisture content must be < 50 ppm before processing to prevent IV drop.
              </p>
            </div>
          </div>
        `,
        isActive: true,
        categories: ['PET Resins'],
        features: ['High Clarity', 'Food Grade', 'Recyclable'],
        applications: ['Packaging', 'Blow Molding']
      },
      {
        companyId: getCompanyId('Formosa Plastics'),
        name: 'Formosa PET CR-8863',
        slug: 'formosa-pet-cr-8863',
        shortDescription: 'High-IV PET resin for large container and industrial applications requiring superior mechanical properties.',
        seoTitle: 'Formosa PET CR-8863 – High IV PET Resin | Shashvat Trading',
        seoDescription: 'High intrinsic viscosity PET resin for large containers and hot-fill applications. Features superior mechanical strength and thermal stability.',
        contentHtml: `
          <div class="product-wrapper">
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Product Overview</h2>
              <p style="color: #374151; line-height: 1.7;"><strong style="color: #1f2937;">Formosa PET CR-8863</strong> is a high molecular weight PET resin with an Intrinsic Viscosity (IV) of 0.86. It is engineered for applications demanding superior mechanical strength, such as large volume containers (5-gallon water jars) and reusable packaging.
              </p>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Technical Specifications</h2>
              <div class="table-responsive">
                <table class="spec-table" style="width: 100%; border-collapse: collapse;">
                  <thead>
                    <tr style="background-color: #f1f5f9;">
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Property</th>
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Value</th>
                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">Test Method</th>
                    </tr>
                  </thead>
                  <tbody>
                  <tr style="background-color: #ffffff;">
                      <td style="padding: 10px; color: #374151; border-bottom: 1px solid #e5e7eb;">Intrinsic Viscosity</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; border-bottom: 1px solid #e5e7eb;">0.86 ± 0.02 dl/g</td>
                      <td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">ASTM D4603</td>
                    </tr>
                  <tr style="background-color: #f9fafb;">
                      <td style="padding: 10px; color: #374151; ">Melting Point</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; ">250 ± 2°C</td>
                      <td style="padding: 10px; color: #6b7280; ">DSC</td>
                    </tr>
                  <tr><td>Acetaldehyde</td><td>< 1.0 ppm</td><td>GC</td></tr>
                  <tr><td>Dust Content</td><td>< 100 ppm</td><td>FPC Method</td></tr>
                  <tr><td>Moisture Content</td><td>< 0.2 %</td><td>ASTM D6980</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Key Benefits</h2>
              <ul>
                <li><strong style="color: #1f2937;">High Mechanical Strength</strong><br>Withstands drop tests and heavy loads</li>
                <li><strong style="color: #1f2937;">Thermal Stability</strong><br>Suitable for hot-fill applications</li>
                <li><strong style="color: #1f2937;">Excellent Blow Efficiency</strong><br>Stable material distribution in large molds</li>
                <li><strong style="color: #1f2937;">Reusable</strong><br>Durable enough for returnable bottle cycles</li>
                <li><strong style="color: #1f2937;">Neutral Color</strong><br>Excellent clarity and color neutrality</li>
              </ul>
            </div>
          
            <div class="section">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Recommended Applications</h2>
              <ul style="color: #374151; line-height: 1.8;"><li style="padding: 4px 0;">5-gallon water cooler bottles</li>
                <li style="padding: 4px 0;">Large volume edible oil containers</li>
                <li style="padding: 4px 0;">Hot-fill juice bottles</li>
                <li style="padding: 4px 0;">Strapping tape</li>
                <li style="padding: 4px 0;">Industrial packaging</li>
              </ul>
            </div>
          
            <div class="highlight">
              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">Processing Guidelines</h2>
              <p style="color: #374151; line-height: 1.7;">
                Recommended extruder temp: <strong style="color: #1f2937;">265–290°C</strong><br>
                Injection pressure may need to be increased due to higher viscosity.<br>
                Rigorous drying required: <strong style="color: #1f2937;">170°C for 5 hours</strong>.
              </p>
            </div>
          </div>
        `,
        isActive: true,
        categories: ['PET Resins'],
        features: ['High Clarity', 'Food Grade', 'Recyclable', 'Chemical Resistant'],
        applications: ['Packaging', 'Blow Molding', 'Consumer Goods']
      },
    ];

    for (const product of productData) {
      const { categories: cats, features: feats, applications: apps, ...productInfo } = product;

      const [result] = await db.insert(products).values({
        ...productInfo,
        seoTitle: productInfo.seoTitle || `${productInfo.name} - Premium Plastic Resin | Shashvat Trading`,
        seoDescription: productInfo.seoDescription || productInfo.shortDescription,
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
      {
        title: 'Understanding Different Types of Polyethylene: LDPE, LLDPE, and HDPE',
        slug: 'understanding-polyethylene-types',
        featuredImage: 'https://images.unsplash.com/photo-1595246140625-30fa643801ea?auto=format&fit=crop&q=80&w=800',
        excerpt: 'A comprehensive guide to the different types of polyethylene and their applications in various industries.',
        contentHtml: `
<h2 style="color: #1e3a8a; border-bottom: 2px solid #cbd5e1; padding-bottom: 10px; margin-top: 24px;">Understanding Different Types of Polyethylene: LDPE, LLDPE, and HDPE</h2>

<p style="color: #334155; line-height: 1.7; margin-bottom: 16px;">Polyethylene (PE) remains the most widely utilized polymer in the global industrial landscape. Its versatility, ease of processing, and cost-effectiveness have made it the backbone of modern packaging, construction, and consumer goods industries. However, to the uninitiated, "polyethylene" can be a vague term, as it encompasses several distinct variants, each with unique molecular structures and physical properties.</p>

<h3 style="color: #0f172a; margin-top: 20px; border-left: 4px solid #1e3a8a; padding-left: 12px; margin-bottom: 12px;">Background and Fundamentals</h3>
<p style="color: #334155; line-height: 1.7; margin-bottom: 16px;">At its core, polyethylene is a thermoplastic polymer produced through the polymerization of ethylene gas. The primary differentiator between its types—LDPE, LLDPE, and HDPE—is the degree and nature of chain branching. This microscopic architectural difference significantly impacts density, crystallinity, and the resulting mechanical strength of the material.</p>

<h3 style="color: #0f172a; margin-top: 20px; border-left: 4px solid #1e3a8a; padding-left: 12px; margin-bottom: 12px;">Detailed Breakdown of Polyethylene Variants</h3>

<h4 style="color: #1e3a8a; margin-top: 16px; margin-bottom: 8px;">Low-Density Polyethylene (LDPE)</h4>
<p style="color: #334155; line-height: 1.7; margin-bottom: 16px;">LDPE is characterized by a high degree of long and short-chain branching, which prevents the molecules from packing closely together. This results in a low-density, highly flexible material. LDPE is renowned for its excellent clarity, high ductility, and superior moisture barrier properties.</p>

<h4 style="color: #1e3a8a; margin-top: 16px; margin-bottom: 8px;">Linear Low-Density Polyethylene (LLDPE)</h4>
<p style="color: #334155; line-height: 1.7; margin-bottom: 16px;">LLDPE differs from LDPE in its molecular structure; it consists of a linear backbone with short, uniform branches. This structure gives LLDPE higher tensile strength and higher puncture resistance than LDPE. It offers a unique balance of toughness and flexibility, making it ideal for thin-film applications where durability is paramount.</p>

<h4 style="color: #1e3a8a; margin-top: 16px; margin-bottom: 8px;">High-Density Polyethylene (HDPE)</h4>
<p style="color: #334155; line-height: 1.7; margin-bottom: 16px;">HDPE has minimal branching, allowing polymer chains to pack tightly. This high crystallinity results in a denser, more rigid, and stronger material. HDPE offers excellent chemical resistance, high impact strength, and can withstand higher temperatures compared to LDPE.</p>

<h3 style="color: #0f172a; margin-top: 20px; border-left: 4px solid #1e3a8a; padding-left: 12px; margin-bottom: 12px;">Industrial Applications</h3>
<ul style="color: #334155; line-height: 1.7; padding-left: 20px; margin-bottom: 16px;">
    <li style="margin-bottom: 8px;"><strong style="color: #1f2937;">LDPE:</strong> Squeeze bottles, lightweight packaging films, bread bags, and coatings for paper boards.</li>
    <li style="margin-bottom: 8px;"><strong style="color: #1f2937;">LLDPE:</strong> Stretch wrap films, heavy-duty industrial liners, flexible tubing, and agricultural covers.</li>
    <li style="margin-bottom: 8px;"><strong style="color: #1f2937;">HDPE:</strong> Industrial drums, heavy-duty pipes for water and gas, chemical containers, and geomembranes.</li>
</ul>

<h3 style="color: #0f172a; margin-top: 20px; border-left: 4px solid #1e3a8a; padding-left: 12px; margin-bottom: 12px;">Key Considerations and Benefits</h3>
<div style="overflow-x: auto; margin-bottom: 24px;">
<table style="width: 100%; border-collapse: collapse; border: 1px solid #e2e8f0; font-size: 14px;">
    <thead>
        <tr style="background-color: #f1f5f9;">
            <th style="padding: 12px; border: 1px solid #e2e8f0; text-align: left; color: #1e3a8a;">Property</th>
            <th style="padding: 12px; border: 1px solid #e2e8f0; text-align: left; color: #1e3a8a;">LDPE</th>
            <th style="padding: 12px; border: 1px solid #e2e8f0; text-align: left; color: #1e3a8a;">LLDPE</th>
            <th style="padding: 12px; border: 1px solid #e2e8f0; text-align: left; color: #1e3a8a;">HDPE</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="padding: 12px; border: 1px solid #e2e8f0; background-color: #f8fafc; font-weight: bold;">Flexibility</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0;">High</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0;">Medium-High</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0;">Low-Medium</td>
        </tr>
        <tr>
            <td style="padding: 12px; border: 1px solid #e2e8f0; background-color: #f8fafc; font-weight: bold;">Puncture Resistance</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0;">Medium</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0;">High</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0;">High</td>
        </tr>
        <tr>
            <td style="padding: 12px; border: 1px solid #e2e8f0; background-color: #f8fafc; font-weight: bold;">Optical Clarity</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0;">Excellent</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0;">Medium</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0;">Low (Opaque)</td>
        </tr>
        <tr>
            <td style="padding: 12px; border: 1px solid #e2e8f0; background-color: #f8fafc; font-weight: bold;">Chemical Resistance</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0;">Good</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0;">Good</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0;">Excellent</td>
        </tr>
    </tbody>
                  </tbody>
                </table>
</div>

<h3 style="color: #0f172a; margin-top: 20px; border-left: 4px solid #1e3a8a; padding-left: 12px; margin-bottom: 12px;">Conclusion</h3>
<p style="color: #334155; line-height: 1.7; margin-bottom: 16px;">Selecting the appropriate polyethylene grade is critical for optimizing product performance and manufacturing efficiency. Whether an application requires the supreme flexibility of LDPE, the puncture resistance of LLDPE, or the structural rigidity of HDPE, understanding these fundamental differences ensures that procurement teams and engineers make informed material decisions for their specific industrial requirements.</p>
        `,
        seoTitle: 'Understanding LDPE, LLDPE, and HDPE | Shashvat Trading',
        seoDescription: 'Learn about the differences between LDPE, LLDPE, and HDPE polyethylene.',
        isPublished: true,
        publishedAt: new Date('2025-01-15')
      },
      {
        title: 'Sustainable Plastics: The Future of Polymer Industry',
        slug: 'sustainable-plastics-future',
        featuredImage: 'https://images.unsplash.com/photo-1532187891844-d25ca39700dc?auto=format&fit=crop&q=80&w=800',
        excerpt: 'Exploring eco-friendly alternatives and recycling innovations in the plastics industry.',
        contentHtml: `
<h2 style="color: #1e3a8a; border-bottom: 2px solid #cbd5e1; padding-bottom: 10px; margin-top: 24px;">Sustainable Plastics: The Future of Polymer Industry</h2>

<p style="color: #334155; line-height: 1.7; margin-bottom: 16px;">The global polymer industry is currently navigating a profound transition. Driven by regulatory pressure, environmental imperatives, and shifting consumer expectations, the focus has moved from purely functional performance to the entire lifecycle of plastic materials. Sustainability is no longer a peripheral consideration; it is the central pillar of innovation in the 2025 polymer market.</p>

<h3 style="color: #0f172a; margin-top: 20px; border-left: 4px solid #1e3a8a; padding-left: 12px; margin-bottom: 12px;">Modern Concepts in Polymer Sustainability</h3>
<p style="color: #334155; line-height: 1.7; margin-bottom: 16px;">Sustainability in the plastics sector is primarily addressed through three distinct but intersecting pathways: the development of bio-based resins, the advancement of chemical and mechanical recycling technologies, and the design of materials for a circular economy. These initiatives aim to decouple plastic production from fossil fuel consumption and eliminate post-consumer waste.</p>

<h3 style="color: #0f172a; margin-top: 20px; border-left: 4px solid #1e3a8a; padding-left: 12px; margin-bottom: 12px;">Detailed Breakdown of Sustainable Initiatives</h3>

<h4 style="color: #1e3a8a; margin-top: 16px; margin-bottom: 8px;">Mechanical vs. Chemical Recycling</h4>
<p style="color: #334155; line-height: 1.7; margin-bottom: 16px;">Mechanical recycling remains the most energy-efficient method for processing high-purity waste streams like PET and HDPE. However, chemical recycling (advanced recycling) is emerging as a critical solution for contaminated or mixed-plastic waste. It breaks down polymers into their original monomers, allowing for the production of "virgin-quality" recycled resin that is suitable even for food-contact and medical applications.</p>

<h4 style="color: #1e3a8a; margin-top: 16px; margin-bottom: 8px;">Bio-based and Biodegradable Polymers</h4>
<p style="color: #334155; line-height: 1.7; margin-bottom: 16px;">Bio-based polymers are derived from renewable feedstocks such as corn starch, sugarcane, or cellulose. While "bio-based" refers to the source, "biodegradable" refers to the end-of-life. Industry leaders are focusing on drop-in bio-based resins—like Bio-PE or Bio-PET—which offer identical performance to their fossil-based counterparts while significantly reducing the carbon footprint.</p>

<h3 style="color: #0f172a; margin-top: 20px; border-left: 4px solid #1e3a8a; padding-left: 12px; margin-bottom: 12px;">Use Cases and Applications</h3>
<ul style="color: #334155; line-height: 1.7; padding-left: 20px; margin-bottom: 16px;">
    <li style="margin-bottom: 8px;"><strong style="color: #1f2937;">Automotive:</strong> Use of recycled polyamide (Nylon) in under-the-hood components and bio-based composites for interior trim.</li>
    <li style="margin-bottom: 8px;"><strong style="color: #1f2937;">Packaging:</strong> Widespread adoption of rPET (Recycled Polyethylene Terephthalate) for beverage containers and compostable PLA for food packaging.</li>
    <li style="margin-bottom: 8px;"><strong style="color: #1f2937;">Construction:</strong> Utilization of recycled PVC in window profiles and composite decking made from recycled polyolefins.</li>
</ul>

<h3 style="color: #0f172a; margin-top: 20px; border-left: 4px solid #1e3a8a; padding-left: 12px; margin-bottom: 12px;">Key Benefits of Sustainable Transition</h3>
<p style="color: #334155; line-height: 1.7; margin-bottom: 16px;">Transitioning to sustainable polymer solutions offers significant strategic advantages for manufacturers. Beyond environmental compliance, it enhances brand reputation and aligns companies with the ESG (Environmental, Social, and Governance) requirements of institutional investors. Furthermore, innovations in material science often lead to lightweighting opportunities, which directly reduce logistics costs and energy consumption across the supply chain.</p>

<h3 style="color: #0f172a; margin-top: 20px; border-left: 4px solid #1e3a8a; padding-left: 12px; margin-bottom: 12px;">Conclusion</h3>
<p style="color: #334155; line-height: 1.7; margin-bottom: 24px;">The future of the polymer industry is undeniably circular. Manufacturers and converters who successfully integrate sustainable resins and recycling technologies into their production processes will be better positioned to lead the market. As we move towards 2025, the synergy between high-performance material science and environmental responsibility will define the success of the global plastics industry.</p>
        `,
        seoTitle: 'Sustainable Plastics & Recycling | Shashvat Trading',
        seoDescription: 'Explore the future of sustainable plastics.',
        isPublished: true,
        publishedAt: new Date('2025-01-10')
      },
      {
        title: 'Guide to Selecting the Right Polypropylene Grade',
        slug: 'polypropylene-grade-selection-guide',
        featuredImage: 'https://images.unsplash.com/photo-1591123720164-de1348b2c4da?auto=format&fit=crop&q=80&w=800',
        excerpt: 'How to choose between PP homopolymer, random copolymer, and impact copolymer.',
        contentHtml: `
<h2 style="color: #1e3a8a; border-bottom: 2px solid #cbd5e1; padding-bottom: 10px; margin-top: 24px;">Guide to Selecting the Right Polypropylene Grade</h2>

<p style="color: #334155; line-height: 1.7; margin-bottom: 16px;">Polypropylene (PP) is one of the most versatile thermoplastics available today, utilized in everything from high-speed injection molding to large-scale extrusion. However, selecting the correct grade is often complicated by the three primary variants: Homopolymer, Random Copolymer, and Impact Copolymer. Each variant offers a distinct balance of clarity, stiffness, and impact resistance tailored for specific industrial requirements.</p>

<h3 style="color: #0f172a; margin-top: 20px; border-left: 4px solid #1e3a8a; padding-left: 12px; margin-bottom: 12px;">Fundamentals of Polypropylene Chemistry</h3>
<p style="color: #334155; line-height: 1.7; margin-bottom: 16px;">The properties of PP are governed by how the propylene monomers are arranged and whether second monomers (typically ethylene) are introduced during the polymerization process. This molecular arrangement dictates the material's crystallinity, which in turn influences its thermal resistance and mechanical strength.</p>

<h3 style="color: #0f172a; margin-top: 20px; border-left: 4px solid #1e3a8a; padding-left: 12px; margin-bottom: 12px;">Detailed Breakdown of PP Variants</h3>

<h4 style="color: #1e3a8a; margin-top: 16px; margin-bottom: 8px;">PP Homopolymer (PPH)</h4>
<p style="color: #334155; line-height: 1.7; margin-bottom: 16px;">Homopolymer is the most widely used general-purpose grade. It contains only propylene monomers in a semi-crystalline form. It offers the highest stiffness, superior strength-to-weight ratio, and excellent chemical resistance. However, it becomes brittle at low temperatures (near 0°C).</p>

<h4 style="color: #1e3a8a; margin-top: 16px; margin-bottom: 8px;">PP Random Copolymer (PPR)</h4>
<p style="color: #334155; line-height: 1.7; margin-bottom: 16px;">Random copolymers are produced by introducing a small amount of ethylene (typically 1-7%) randomly into the polymer chain. This disrupts the crystallinity, resulting in a material with exceptional optical clarity and improved flexibility. PPR is preferred for applications where aesthetics and transparency are critical.</p>

<h4 style="color: #1e3a8a; margin-top: 16px; margin-bottom: 8px;">PP Impact Copolymer (PPC)</h4>
<p style="color: #334155; line-height: 1.7; margin-bottom: 16px;">Impact copolymers (also known as block copolymers) contain a higher percentage of ethylene (up to 15%) arranged in distinct phases or blocks. This creates a heterophasic structure that provides extraordinary impact strength, particularly at cold temperatures, while maintaining a respectable level of stiffness.</p>

<h3 style="color: #0f172a; margin-top: 20px; border-left: 4px solid #1e3a8a; padding-left: 12px; margin-bottom: 12px;">Practical Applications</h3>
<ul style="color: #334155; line-height: 1.7; padding-left: 20px; margin-bottom: 16px;">
    <li style="margin-bottom: 8px;"><strong style="color: #1f2937;">PP Homopolymer:</strong> Textile fibers, thin-wall food containers, household goods, and industrial strapping.</li>
    <li style="margin-bottom: 8px;"><strong style="color: #1f2937;">PP Random Copolymer:</strong> Medical syringes, high-clarity housewares, transparent packaging, and "hot-fill" bottles.</li>
    <li style="margin-bottom: 8px;"><strong style="color: #1f2937;">PP Impact Copolymer:</strong> Automotive bumpers, industrial crates, battery cases, appliance parts, and heavy-duty luggage.</li>
</ul>

<h3 style="color: #0f172a; margin-top: 20px; border-left: 4px solid #1e3a8a; padding-left: 12px; margin-bottom: 12px;">Key Selection Criteria</h3>
<div style="overflow-x: auto; margin-bottom: 24px;">
<table style="width: 100%; border-collapse: collapse; border: 1px solid #e2e8f0; font-size: 14px;">
    <thead>
        <tr style="background-color: #f1f5f9;">
            <th style="padding: 12px; border: 1px solid #e2e8f0; text-align: left; color: #1e3a8a;">Feature</th>
            <th style="padding: 12px; border: 1px solid #e2e8f0; text-align: left; color: #1e3a8a;">Homopolymer</th>
            <th style="padding: 12px; border: 1px solid #e2e8f0; text-align: left; color: #1e3a8a;">Random Copolymer</th>
            <th style="padding: 12px; border: 1px solid #e2e8f0; text-align: left; color: #1e3a8a;">Impact Copolymer</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="padding: 12px; border: 1px solid #e2e8f0; background-color: #f8fafc; font-weight: bold;">Stiffness</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0;">Highest</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0;">Medium-Low</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0;">Medium</td>
        </tr>
        <tr>
            <td style="padding: 12px; border: 1px solid #e2e8f0; background-color: #f8fafc; font-weight: bold;">Impact Strength</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0;">Low</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0;">Medium</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0;">Highest</td>
        </tr>
        <tr>
            <td style="padding: 12px; border: 1px solid #e2e8f0; background-color: #f8fafc; font-weight: bold;">Optical Clarity</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0;">Medium-Poor</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0; color: #059669; font-weight: bold;">Excellent</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0;">Poor (Opaque)</td>
        </tr>
        <tr>
            <td style="padding: 12px; border: 1px solid #e2e8f0; background-color: #f8fafc; font-weight: bold;">Cold Temp Performance</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0;">Poor</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0;">Fair</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0; color: #059669; font-weight: bold;">Excellent</td>
        </tr>
    </tbody>
                  </tbody>
                </table>
</div>

<h3 style="color: #0f172a; margin-top: 20px; border-left: 4px solid #1e3a8a; padding-left: 12px; margin-bottom: 12px;">Conclusion</h3>
<p style="color: #334155; line-height: 1.7; margin-bottom: 24px;">Choosing the right polypropylene grade requires a deep understanding of the end-use environment. For rigid structural parts, Homopolymer is often the best choice; for transparent consumer products, Random Copolymer is superior; and for rugged industrial applications in harsh climates, Impact Copolymer is essential. Consultation with a specialized polymer partner can ensure that the selected grade optimizes both performance and cost.</p>
        `,
        seoTitle: 'Polypropylene Grade Selection Guide | Shashvat Trading',
        seoDescription: 'Learn how to select the right polypropylene grade.',
        isPublished: true,
        publishedAt: new Date('2025-01-05')
      },
      {
        title: 'Engineering Plastics: When Standard Polymers Won\'t Do',
        slug: 'engineering-plastics-guide',
        featuredImage: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?auto=format&fit=crop&q=80&w=800',
        excerpt: 'An overview of high-performance engineering plastics and their demanding applications.',
        contentHtml: `
<h2 style="color: #1e3a8a; border-bottom: 2px solid #cbd5e1; padding-bottom: 10px; margin-top: 24px;">Engineering Plastics: When Standard Polymers Won't Do</h2>

<p style="color: #334155; line-height: 1.7; margin-bottom: 16px;">In the hierarchy of thermoplastic materials, engineering plastics occupy the critical middle ground between high-volume commodity resins and expensive specialty polymers. While polyolefins like PE and PP serve the bulk of packaging and consumer needs, engineering plastics—such as Polyamide (Nylon), Polycarbonate (PC), and PBT—are engineered to deliver superior mechanical, thermal, and chemical performance in demanding environments.</p>

<h3 style="color: #0f172a; margin-top: 20px; border-left: 4px solid #1e3a8a; padding-left: 12px; margin-bottom: 12px;">The Concept of High-Performance Material Science</h3>
<p style="color: #334155; line-height: 1.7; margin-bottom: 16px;">Standard polymers often fail when subjected to continuous stress, high temperatures, or aggressive chemical exposure. Engineering plastics are defined by their ability to maintain structural integrity and dimensional stability under these conditions. They are specifically formulated to replace traditional materials like metal, glass, and wood in structural and functional components.</p>

<h3 style="color: #0f172a; margin-top: 20px; border-left: 4px solid #1e3a8a; padding-left: 12px; margin-bottom: 12px;">Detailed Breakdown of Key Engineering Plastics</h3>

<h4 style="color: #1e3a8a; margin-top: 16px; margin-bottom: 8px;">Polyamide (PA / Nylon)</h4>
<p style="color: #334155; line-height: 1.7; margin-bottom: 16px;">Nylon is the "workhorse" of engineering plastics. It offers exceptional wear resistance, high strength, and good thermal stability. When reinforced with glass fibers (e.g., PA6 GF30), its stiffness and heat deflection temperature increase significantly, making it ideal for engine components and industrial gears.</p>

<h4 style="color: #1e3a8a; margin-top: 16px; margin-bottom: 8px;">Polycarbonate (PC)</h4>
<p style="color: #334155; line-height: 1.7; margin-bottom: 16px;">Polycarbonate is renowned for its virtually unbreakable impact strength and glass-like transparency. It also possesses high heat resistance and good electrical insulation properties. It is the material of choice for safety glazing, electronics housings, and medical devices.</p>

<h4 style="color: #1e3a8a; margin-top: 16px; margin-bottom: 8px;">Polybutylene Terephthalate (PBT)</h4>
<p style="color: #334155; line-height: 1.7; margin-bottom: 16px;">PBT is a high-performance polyester characterized by its excellent dimensional stability and electrical properties. It crystallizes rapidly, allowing for extremely fast molding cycles. It is highly resistant to chemicals and moisture, making it a standard in automotive electrical systems.</p>

<h3 style="color: #0f172a; margin-top: 20px; border-left: 4px solid #1e3a8a; padding-left: 12px; margin-bottom: 12px;">Industrial Use Cases</h3>
<ul style="color: #334155; line-height: 1.7; padding-left: 20px; margin-bottom: 16px;">
    <li style="margin-bottom: 8px;"><strong style="color: #1f2937;">Automotive:</strong> Air intake manifolds (PA), lighting lenses (PC), and electrical connectors (PBT).</li>
    <li style="margin-bottom: 8px;"><strong style="color: #1f2937;">Electronics:</strong> Circuit breaker housings, electrical switchgear, and laptop frames.</li>
    <li style="margin-bottom: 8px;"><strong style="color: #1f2937;">Industrial Machinery:</strong> Gears, bushings, bearings, and heavy-duty tool housings.</li>
    <li style="margin-bottom: 8px;"><strong style="color: #1f2937;">Medical:</strong> Surgical instruments, diagnostic equipment housings, and fluid handling systems.</li>
</ul>

<h3 style="color: #0f172a; margin-top: 20px; border-left: 4px solid #1e3a8a; padding-left: 12px; margin-bottom: 12px;">Key Benefits Over Commodity Resins</h3>
<p style="color: #334155; line-height: 1.7; margin-bottom: 16px;">The primary advantage of engineering plastics is their superior strength-to-weight ratio. By replacing metal components with engineering thermoplastics, manufacturers can significantly reduce assembly weight without compromising safety or durability. Furthermore, these materials offer better resistance to corrosion than metals and greater design flexibility, allowing for the consolidation of multiple parts into a single injection-molded component.</p>

<h3 style="color: #0f172a; margin-top: 20px; border-left: 4px solid #1e3a8a; padding-left: 12px; margin-bottom: 12px;">Conclusion</h3>
<p style="color: #334155; line-height: 1.7; margin-bottom: 16px;">Engineering plastics are essential for modern innovation. For any application where failure is not an option—whether due to high heat, mechanical load, or chemical stress—selecting a high-performance engineering resin is the only viable path. Understanding the specific strengths of each polymer family allows engineers to push the boundaries of design and performance.</p>
        `,
        seoTitle: 'Engineering Plastics Guide | Shashvat Trading',
        seoDescription: 'Discover high-performance engineering plastics.',
        isPublished: true,
        publishedAt: new Date('2024-12-28')
      },
      {
        title: 'Global Polymer Market Trends for 2025',
        slug: 'polymer-market-trends-2025',
        featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
        excerpt: 'Key trends and predictions shaping the global plastics and polymer industry in 2025.',
        contentHtml: `
<h2 style="color: #1e3a8a; border-bottom: 2px solid #cbd5e1; padding-bottom: 10px; margin-top: 24px;">Global Polymer Market Trends for 2025</h2>

<p style="color: #334155; line-height: 1.7; margin-bottom: 16px;">As we approach 2025, the global polymer market is navigating a complex landscape of supply chain shifts, regulatory changes, and technological breakthroughs. The industry is moving past the disruptions of previous years and entering a phase of strategic consolidation and innovation focused on sustainability and regional resilience.</p>

<h3 style="color: #0f172a; margin-top: 20px; border-left: 4px solid #1e3a8a; padding-left: 12px; margin-bottom: 12px;">The Backdrop of the 2025 Market</h3>
<p style="color: #334155; line-height: 1.7; margin-bottom: 16px;">The transition toward a net-zero economy and the regionalization of manufacturing are the two most significant drivers shaping the industry. Procurement teams and plastic converters are increasingly prioritizing supply security and carbon footprint metrics alongside traditional cost-benefit analyses.</p>

<h3 style="color: #0f172a; margin-top: 20px; border-left: 4px solid #1e3a8a; padding-left: 12px; margin-bottom: 12px;">Detailed Breakdown of Emerging Trends</h3>

<h4 style="color: #1e3a8a; margin-top: 16px; margin-bottom: 8px;">Shift Toward Bio-Circular-Based Content</h4>
<p style="color: #334155; line-height: 1.7; margin-bottom: 16px;">The industry is seeing a massive surge in demand for materials that include bio-attributed or recycled content. The "Mass Balance" approach is becoming a standardized way for manufacturers to transition existing assets to sustainable feedstocks without sacrificing material performance.</p>

<h4 style="color: #1e3a8a; margin-top: 16px; margin-bottom: 8px;">Advancements in High-Barrier Packaging</h4>
<p style="color: #334155; line-height: 1.7; margin-bottom: 16px;">In the packaging sector, there is a distinct move toward mono-material solutions to facilitate easier recycling. Innovations in LLDPE and HDPE film technology are now allowing these materials to match the barrier properties previously only achievable with complex, multi-material laminates.</p>

<h4 style="color: #1e3a8a; margin-top: 16px; margin-bottom: 8px;">Regionalization of Supply Chains</h4>
<p style="color: #334155; line-height: 1.7; margin-bottom: 16px;">To mitigate geopolitical risks and logistics costs, there is a clear trend toward "Near-shoring." Manufacturers are seeking polymer suppliers with local distribution networks and inventory buffers to ensure continuous production in a volatile global trade environment.</p>

<h3 style="color: #0f172a; margin-top: 20px; border-left: 4px solid #1e3a8a; padding-left: 12px; margin-bottom: 12px;">Market Impact Across Industries</h3>
<ul style="color: #334155; line-height: 1.7; padding-left: 20px; margin-bottom: 16px;">
    <li style="margin-bottom: 8px;"><strong style="color: #1f2937;">Automotive:</strong> Continued lightweighting through the use of glass-filled polyamides and high-performance TPOs (Thermoplastic Olefins).</li>
    <li style="margin-bottom: 8px;"><strong style="color: #1f2937;">Packaging:</strong> Regulatory mandates in Europe and North America requiring minimum recycled content in beverage bottles and shrink wrap.</li>
    <li style="margin-bottom: 8px;"><strong style="color: #1f2937;">Infrastructure:</strong> Increased use of HDPE and PVC in large-scale renewable energy and water management projects.</li>
</ul>

<h3 style="color: #0f172a; margin-top: 20px; border-left: 4px solid #1e3a8a; padding-left: 12px; margin-bottom: 12px;">Strategic Considerations for Decision Makers</h3>
<p style="color: #334155; line-height: 1.7; margin-bottom: 16px;">In 2025, success in the polymer market will require more than just competitive pricing. Companies must develop robust partnerships with distributors who can provide technical support, regulatory documentation, and a stable supply of both virgin and recycled resins. Staying ahead of regional environmental regulations will be the key differentiator between market leaders and followers.</p>

<h3 style="color: #0f172a; margin-top: 20px; border-left: 4px solid #1e3a8a; padding-left: 12px; margin-bottom: 12px;">Conclusion</h3>
<p style="color: #334155; line-height: 1.7; margin-bottom: 24px;">The global polymer market in 2025 will be defined by its ability to innovate in the face of environmental and economic challenges. While commodity price volatility remains a factor, the long-term trend is clearly favoring materials that contribute to a circular economy. Adapting to these trends today is essential for maintaining a competitive edge in the coming years.</p>
        `,
        seoTitle: 'Polymer Market Trends 2025 | Shashvat Trading',
        seoDescription: 'Key trends for the global polymer market in 2025.',
        isPublished: true,
        publishedAt: new Date('2024-12-20')
      },
      {
        title: 'ABS vs. Polycarbonate: Choosing the Right Material',
        slug: 'abs-vs-polycarbonate-comparison',
        featuredImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800',
        excerpt: 'A detailed comparison of ABS and polycarbonate plastics.',
        contentHtml: `
<h2 style="color: #1e3a8a; border-bottom: 2px solid #cbd5e1; padding-bottom: 10px; margin-top: 24px;">ABS vs. Polycarbonate: Choosing the Right Material</h2>

<p style="color: #334155; line-height: 1.7; margin-bottom: 16px;">When engineers and product designers need a high-strength, durable thermoplastic for housings or structural parts, the two most common candidates are Acrylonitrile Butadiene Styrene (ABS) and Polycarbonate (PC). While they may appear similar in finished products, their chemical compositions and physical properties are significantly different, making each suitable for specific industrial niches.</p>

<h3 style="color: #0f172a; margin-top: 20px; border-left: 4px solid #1e3a8a; padding-left: 12px; margin-bottom: 12px;">Understanding the Molecular Chemistry</h3>
<p style="color: #334155; line-height: 1.7; margin-bottom: 16px;">ABS is a terpolymer—a blend of three different monomers—which provides a uniquely balanced profile of toughness, processability, and cost. Polycarbonate, on the other hand, is a high-performance polyester that derives its properties from the rigid carbonate groups in its molecular backbone, leading to superior heat resistance and impact strength.</p>

<h3 style="color: #0f172a; margin-top: 20px; border-left: 4px solid #1e3a8a; padding-left: 12px; margin-bottom: 12px;">Detailed Breakdown of Performance Differences</h3>

<h4 style="color: #1e3a8a; margin-top: 16px; margin-bottom: 8px;">Impact Resistance and Toughness</h4>
<p style="color: #334155; line-height: 1.7; margin-bottom: 16px;">Both materials are "tough," but Polycarbonate is in a class of its own. PC is virtually unbreakable and is often used for bulletproof glazing and safety equipment. ABS offers excellent impact resistance for general use, but it can fail under extreme dynamic loads where PC would remain intact.</p>

<h4 style="color: #1e3a8a; margin-top: 16px; margin-bottom: 8px;">Thermal Properties and Heat Resistance</h4>
<p style="color: #334155; line-height: 1.7; margin-bottom: 16px;">Polycarbonates have significantly higher Heat Deflection Temperatures (HDT), typically around 125°C–140°C. ABS generally has an HDT of 80°C–95°C. For applications exposed to high internal heat—such as automotive engine rooms or high-wattage electronics—PC is often the mandatory choice.</p>

<h4 style="color: #1e3a8a; margin-top: 16px; margin-bottom: 8px;">Aesthetics and Optical Clarity</h4>
<p style="color: #334155; line-height: 1.7; margin-bottom: 16px;">ABS is an opaque material by nature, widely used for its ability to accept varied colors and surface textures. Polycarbonate is inherently transparent, offering glass-like clarity. While "transparent ABS" exists, it cannot match the optical quality of PC.</p>

<h3 style="color: #0f172a; margin-top: 20px; border-left: 4px solid #1e3a8a; padding-left: 12px; margin-bottom: 12px;">Comparison Summary</h3>
<div style="overflow-x: auto; margin-bottom: 24px;">
<table style="width: 100%; border-collapse: collapse; border: 1px solid #e2e8f0; font-size: 14px;">
    <thead>
        <tr style="background-color: #f1f5f9;">
            <th style="padding: 12px; border: 1px solid #e2e8f0; text-align: left; color: #1e3a8a;">Property</th>
            <th style="padding: 12px; border: 1px solid #e2e8f0; text-align: left; color: #1e3a8a;">ABS</th>
            <th style="padding: 12px; border: 1px solid #e2e8f0; text-align: left; color: #1e3a8a;">Polycarbonate (PC)</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="padding: 12px; border: 1px solid #e2e8f0; background-color: #f8fafc; font-weight: bold;">Impact Strength</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0;">Good</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0; color: #059669; font-weight: bold;">Excellent (Superior)</td>
        </tr>
        <tr>
            <td style="padding: 12px; border: 1px solid #e2e8f0; background-color: #f8fafc; font-weight: bold;">Heat Resistance</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0;">Moderate</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0; color: #059669; font-weight: bold;">High</td>
        </tr>
        <tr>
            <td style="padding: 12px; border: 1px solid #e2e8f0; background-color: #f8fafc; font-weight: bold;">Processability</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0; color: #059669; font-weight: bold;">Excellent</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0;">Fair-Moderate</td>
        </tr>
        <tr>
            <td style="padding: 12px; border: 1px solid #e2e8f0; background-color: #f8fafc; font-weight: bold;">Cost</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0; color: #059669; font-weight: bold;">Lower</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0;">Higher</td>
        </tr>
        <tr>
            <td style="padding: 12px; border: 1px solid #e2e8f0; background-color: #f8fafc; font-weight: bold;">Clarity</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0;">Opaque Only</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0;">Transparent or Opaque</td>
        </tr>
    </tbody>
                  </tbody>
                </table>
</div>

<h3 style="color: #0f172a; margin-top: 20px; border-left: 4px solid #1e3a8a; padding-left: 12px; margin-bottom: 12px;">Practical Applications</h3>
<ul style="color: #334155; line-height: 1.7; padding-left: 20px; margin-bottom: 16px;">
    <li style="margin-bottom: 8px;"><strong style="color: #1f2937;">ABS:</strong> Consumer electronics (keyboards, monitors), toys (LEGO), automotive trim, and plumbing pipes.</li>
    <li style="margin-bottom: 8px;"><strong style="color: #1f2937;">Polycarbonate:</strong> Clear lenses, safety visors, medical devices, high-heat lamp housings, and security windows.</li>
    <li style="margin-bottom: 8px;"><strong style="color: #1f2937;">PC/ABS Blends:</strong> Often used as a compromise to gain the impact strength of PC with the easy processing of ABS (e.g., laptop frames).</li>
</ul>

<h3 style="color: #0f172a; margin-top: 20px; border-left: 4px solid #1e3a8a; padding-left: 12px; margin-bottom: 12px;">Conclusion</h3>
<p style="color: #334155; line-height: 1.7; margin-bottom: 24px;">The choice between ABS and Polycarbonate usually comes down to three factors: cost, temperature, and transparency. If a project requires high heat resistance or crystal clarity, Polycarbonate is essential. If the application is a general-purpose colored molding where cost is a major factor, ABS remains the industry standard. For demanding applications requiring the best of both worlds, PC/ABS alloys offer a proven alternative.</p>
        `,
        seoTitle: 'ABS vs Polycarbonate Comparison | Shashvat Trading',
        seoDescription: 'Compare ABS and polycarbonate plastics.',
        isPublished: true,
        publishedAt: new Date('2024-12-15')
      },
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

    // Seed Product Documents
    console.log('Seeding product documents...');
    const productsForDocs = await db.select().from(products).limit(5);

    for (const product of productsForDocs) {
      // Add a Technical Data Sheet
      await db.insert(productDocuments).values({
        productId: product.id,
        filePath: '/uploads/products/documents/sample-datasheet.pdf',
        fileName: `${product.name} - Technical Data Sheet.pdf`,
        fileSize: 1024 * 1024, // 1MB dummy size
      });

      // Add a Safety Data Sheet (duplicate to show list)
      await db.insert(productDocuments).values({
        productId: product.id,
        filePath: '/uploads/products/documents/sample-datasheet.pdf',
        fileName: `${product.name} - Safety Data Sheet.pdf`,
        fileSize: 512 * 1024, // 512KB dummy size
      });
    }

    console.log('✅ Product documents seeded successfully!');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    await poolConnection.end();
  }
}

seed();



