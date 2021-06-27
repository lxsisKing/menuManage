import xlsxwriter
from datetime import datetime
from pathlib import Path
from Crypto.Cipher import AES
from django.conf import settings
import base64


def export_excel_file(date_info, data):
    """
    写入数据到文件夹
    """
    BASE_DIR = Path(__file__).resolve().parent.parent.parent
    save_path = Path.joinpath(BASE_DIR, 'static/temporary_file')
    filename = '{}.xlsx'.format(date_info)
    file_path = '{}/{}'.format(save_path, filename)
    f = xlsxwriter.Workbook(file_path)
    worksheet = f.add_worksheet()
    row = 0
    for key, value in data.items():
        worksheet.write(row, 0, key)
        worksheet.write_row(row, 1, value)
        row += 1
    f.close()
    f = open(file_path, 'rb')
    # with open(file_path, 'rb') as f:
    return dict(
        data=f,
        filename=filename
    )
    
def decrypt(value):
    """
    解密数据
    """
    key = settings.AES_KEY.encode('utf-8')
    iv = settings.AES_IV.encode('utf-8')
    mode = AES.MODE_CBC
    cryptor = AES.new(key, mode, iv)
    value_b64 = base64.b64decode(value)
    plain_text = cryptor.decrypt(value_b64)
    
    plain_text = bytes.decode(plain_text)
    r_str = plain_text[-1]
    plain_text = plain_text.rstrip(r_str)
    return plain_text
    
    
    
    
    