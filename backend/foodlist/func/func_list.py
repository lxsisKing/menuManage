import xlsxwriter
from datetime import datetime

def export_excel_file(data):
    today = datetime.now().strftime('%Y-%m-%d')
    file_path = '/backend/static/temporary_file/{}.xlsx'.format(today)
    f = xlsxwriter.Workbook(file_path)
    worksheet = f.add_worksheet()