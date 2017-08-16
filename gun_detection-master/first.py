import urllib.request
import cv2
import numpy as np 
import os
from os import listdir
from os.path import isfile, join

def store_raw_images():
    
    if not os.path.exists('neg_resized'):
        os.makedirs('neg_resized')
    mypath='/Users/anirudh/Downloads/neg2'
    onlyfiles = [ f for f in listdir(mypath) if isfile(join(mypath,f)) ]
    print(len(onlyfiles))
    images = np.empty(len(onlyfiles), dtype=object)
    pic_num = 1766
    for n in range(0, len(onlyfiles)):
        print(join(mypath, onlyfiles[n]))
        images[n] = cv2.imread( join(mypath,onlyfiles[n]), cv2.IMREAD_GRAYSCALE)
        images[n] = cv2.resize(images[n], (100, 100))
        cv2.imwrite('neg_resized/' + str(pic_num) + '.jpg', images[n])
        pic_num+=1
    print(pic_num)

def create_pos_n_neg():
    for file_type in ['neg_resized']:
        
        for img in listdir(file_type):

            if file_type == 'pos':
                line = file_type+'/'+img+' 1 0 0 50 50\n'
                with open('info.dat','a') as f:
                    f.write(line)
            elif file_type == 'neg_resized':
                line = file_type+'/'+img+'\n'
                with open('bg.txt','a') as f:
                    f.write(line)

#store_raw_images()
create_pos_n_neg()