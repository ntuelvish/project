def sample_images(self, epoch, data_is_gasd=True):
        r, c = 3, 3
        z = np.random.normal(size=(r*c, self.latent_dim))
        gen_imgs = self.decoder.predict(z)
        print(gen_imgs.shape)

        if data_is_gasd :
            temp = np.zeros((gen_imgs.shape[0], 32, 4))
            for i in range(gen_imgs.shape[0]):
                for c in range(gen_imgs.shape[3]):
                    gen_imgs_each = pro.gasf2ts(gen_imgs[i, :, :, c])
                    temp[i, :, c] = gen_imgs_each
            gen_imgs = temp


            

        candle_open = gen_imgs[:, :, 0]
        candle_high = gen_imgs[:, :, 1]
        candle_low = gen_imgs[:, :, 2]
        candle_close = gen_imgs[:, :, 3]

        max_in_o_c = np.maximum(candle_open, candle_close)
        min_in_o_c = np.minimum(candle_open, candle_close)

        gen_imgs[:, :, 1] = np.maximum(candle_high, max_in_o_c)
        gen_imgs[:, :, 2] = np.minimum(candle_low, min_in_o_c)

        plot.plot_result(gen_imgs, epoch)


def plot_result(ts_data, epoch):
    '''
    Args:
        ts_data (numpy): (error_n, 32, 4)
    '''
    fig = plt.figure(figsize=(25,25))
    axes_ls = []

    for l in range(3):
        for j in range(3):
            axes_ls.append(plt.subplot2grid((3, 3), (l, j), colspan=1, rowspan=1))
    
    for i in range(ts_data.shape[0]):
        ts_arr = np.c_[range(ts_data[i, :, :].shape[0]), ts_data[i, :, :]]
        mpf.candlestick_ohlc(axes_ls[i], ts_arr, width=0.4, alpha=1,
                            colordown='#53c156', colorup='#ff1717')
        axes_ls[i].axes.get_yaxis().set_visible(True)
        axes_ls[i].axes.get_xaxis().set_visible(True)
        axes_ls[i].axes.get_yaxis().set_ticks([])
        axes_ls[i].axes.get_xaxis().set_ticks([])

    plt.close()
    fig.savefig("./imges/vocal_%d.png" % epoch)
    plt.close()