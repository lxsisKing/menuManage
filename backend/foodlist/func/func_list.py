import xlsxwriter
from datetime import datetime
from pathlib import Path

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