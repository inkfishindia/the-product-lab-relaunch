import csv, json, re

csv_path = '/Users/danish/Library/CloudStorage/GoogleDrive-danish@yourdesignstore.in/My Drive/market/the-product-lab-relaunch/TPL DUMP/wc-product-export-11-6-2026-1781128734010.csv'
output_path = '/Users/danish/Library/CloudStorage/GoogleDrive-danish@yourdesignstore.in/My Drive/market/the-product-lab-relaunch/catalogs/cleaned_catalog.json'

def strip_html_tags(text):
    if not text:
        return ''
    clean = re.sub(r'<[^>]+>', '', text)
    clean = re.sub(r'\s+', ' ', clean)
    return clean.strip()

def clean_list(value):
    if not value:
        return []
    return [item.strip() for item in value.split(',') if item.strip()]

def process_csv():
    products = []
    with open(csv_path, newline='', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            # Basic validation: need Name and SKU
            if not row.get('Name') or not row.get('SKU'):
                continue
            # Clean text fields
            short_desc = strip_html_tags(row.get('Short description', ''))
            desc = strip_html_tags(row.get('Description', ''))
            # Extract price fields safely
            def to_float(val):
                try:
                    return float(val) if val and val.replace('.','',1).replace(',','',1).isdigit() else 0.0
                except (ValueError, TypeError):
                    return 0.0
            regular_price = to_float(row.get('Regular price'))
            sale_price = to_float(row.get('Sale price'))
            price = sale_price if sale_price > 0 else regular_price
            # Clean image URLs
            images_str = row.get('Images', '')
            image_urls = [url.strip() for url in images_str.split(',') if url.strip()] if images_str else []
            # Clean categories and tags
            categories = clean_list(row.get('Categories', ''))
            tags = clean_list(row.get('Tags', ''))
            # Stock info
            in_stock = row.get('In stock?') == '1'
            stock = row.get('Stock') or '0'
            visibility = row.get('Visibility in catalog', 'visible')
            # Build product dict
            product = {
                'id': row.get('ID'),
                'sku': row.get('SKU'),
                'name': row.get('Name'),
                'short_description': short_desc,
                'description': desc,
                'price': round(price, 2),
                'regular_price': round(regular_price, 2),
                'sale_price': round(sale_price, 2) if sale_price > 0 else None,
                'categories': categories,
                'tags': tags,
                'images': image_urls,
                'stock': stock,
                'in_stock': in_stock,
                'visibility': visibility
            }
            products.append(product)
    # Write output
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(products, f, indent=2, ensure_ascii=False)
    return len(products)

if __name__ == '__main__':
    count = process_csv()
    print(f'Processed {count} products, saved to {output_path}')