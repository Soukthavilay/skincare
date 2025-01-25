function OtpVerification({ handleOtpSubmit, handleOtpChange, otpFormData, handleBackToRegister, t }) {
  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-2xl">
        <form onSubmit={handleOtpSubmit} className="space-y-6">
          <h1 className="text-2xl font-bold text-gray-800 text-center">
            {t('label-enter-otp')}
          </h1>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                {t('label-email')}
              </label>
              <input
                type="email"
                name="email"
                placeholder={t('label-email')}
                onChange={handleOtpChange}
                value={otpFormData.email}
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                {t('label-otp')}
              </label>
              <input
                type="text"
                name="otp"
                placeholder={t('label-otp')}
                onChange={handleOtpChange}
                value={otpFormData.otp}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-between items-center space-x-4">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 focus:outline-none transition-all duration-200"
            >
              {t('label-verify')}
            </button>
            <button
              type="button"
              onClick={handleBackToRegister}
              className="w-full py-2 px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:ring-4 focus:ring-gray-400 focus:outline-none transition-all duration-200"
            >
              {t('label-back-to-register')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OtpVerification;
