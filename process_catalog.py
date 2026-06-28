import csv, json, re, sys

csv_path = '/Users/danish/Library/CloudStorage/GoogleDrive-danish@yourdesignstore.in/My Drive/market/the-product-lab-relaunch/TPL DUMP/wc-product-export-11-6-2026-1781128734010.csv'
output_path = '/Users/danish/Library/CloudStorage/GoogleDrive-danish@yourdesignstore.in/My Drive/market/the-product-lab-relaunch/cleaned_catalog.json'

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
            if not row.get('Name') or not row.get('SKU'):
                continue
            short_desc = strip_html_tags(row.get('Short description', ''))
            desc = strip_html_tags(row.get('Description', ''))
            try:
                sale_price = row.get('Sale price')
                regular_price = row.get('Regular price')
                if sale_price and float(sale_price) > 0:
                    price = float(sale_price)
                else:
                    price = float(regular_price) if regular_price and float(regular_price) > 0 else 0.0
            except (ValueError, TypeError):
                price = 0.0
            images_str = row.get('Images', '')
            image_urls = [url.strip() for url in images_str.split(',') if url.strip()] if images_str else []
            categories_str = row.get('Categories', '')
            categories = clean_list(categories_str)
            tags_str = row.get('Tags', '')
            tags = clean_list(tags_str)
            product = {
                'id': row.get('ID'),
                'sku': row.get('SKU'),
                'name': row.get('Name'),
                'short_description': short_desc,
                'description': desc,
                'price': round(price, 2),
                'regular_price': round(float(regular_price) if regular_price and float(regular_price) > 0 else price, 2),
                'sale_price': round(float(sale_price) if sale_price and float(sale_price) > 0 else None, 2),
                'categories': categories,
                'tags': tags,
                'images': image_urls,
                'stock': row.get('Stock') or '0',
                'in_stock': row.get('In stock?') == '1',
                'visibility': row.get('Visibility in catalog', 'visible')
            }
            products.append(product)
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(products, f, indent=2, ensure_ascii=False)
    return len(products)

if __name__ == '__main__':
    count = process_csv()
    print(f'Processed {count} products, saved to {output_path}')