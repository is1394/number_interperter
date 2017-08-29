# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import re
from PIL import Image
import datetime
import json
import base64


from django.views.generic import TemplateView
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from Reconocedor_digitos_FINAL.reconocedor_digitos import evalue

# Create your views here.
def generate_name():
    return datetime.datetime.now().strftime("%Y%m%d%H%M%S")

def convert_to_jpeg(file):
    png = Image.open(file)
    png.load()
    background = Image.new("RGB", png.size, (255, 255, 255))
    background.paste(png, mask=png.split()[3]) # 3 is the alpha channel
    background.save(file, 'PNG', quality=80)

@csrf_exempt
def home(request):
    if request.method == 'GET':
        return render(request, 'base.html')
    else:
        datauri = str(request.body.decode('utf-8'))
        jsondata  = json.loads(datauri)
        imgstr = jsondata.get('image').split(',')[1]
        name = generate_name()
        bytestring = bytes(imgstr, 'utf-8')
        output = open("{}/{}.png".format('media', name), 'wb+')
        output.write(base64.decodebytes(bytestring))
        output.close()
        convert_to_jpeg(output.name)
        result = evalue(output.name)
        value = result[0].astype('str')
        return JsonResponse({'result': value})

