'use client'
import { Auth } from '@supabase/auth-ui-react'
import { Theme } from '@supabase/auth-ui-shared'
import Image from 'next/image'
import JadeFinanceLogo from '@../../public/images/JadeFinanceLogo.png'
import { createClient } from '~/util/supabase/client'

export const customTheme: Theme = {
  default: {
    colors: {
      brand: '#14b8a6',
      brandAccent: '#2dd4bf',
      brandButtonText: 'white',
      defaultButtonBackground: 'white',
      defaultButtonBackgroundHover: '#eaeaea',
      defaultButtonBorder: 'lightgray',
      defaultButtonText: 'gray',
      dividerBackground: '#eaeaea',
      inputBackground: 'transparent',
      inputBorder: 'lightgray',
      inputBorderHover: '#111827',
      inputBorderFocus: '#111827',
      inputText: 'black',
      inputLabelText: 'gray',
      inputPlaceholder: 'darkgray',
      messageText: '#2b805a',
      messageBackground: '#e7fcf1',
      messageBorder: '#d0f3e1',
      messageTextDanger: '#ff6369',
      messageBackgroundDanger: '#fff8f8',
      messageBorderDanger: '#822025',
      anchorTextColor: 'gray',
      anchorTextHoverColor: 'darkgray',
    },
    space: {
      spaceSmall: '4px',
      spaceMedium: '8px',
      spaceLarge: '16px',
      labelBottomMargin: '8px',
      anchorBottomMargin: '4px',
      emailInputSpacing: '4px',
      socialAuthSpacing: '4px',
      buttonPadding: '10px 15px',
      inputPadding: '10px 15px',
    },
    fontSizes: {
      baseBodySize: '14px',
      baseInputSize: '14px',
      baseLabelSize: '14px',
      baseButtonSize: '18px',
    },
    fonts: {
      bodyFontFamily: `ui-sans-serif, sans-serif`,
      buttonFontFamily: `ui-sans-serif, sans-serif`,
      inputFontFamily: `ui-sans-serif, sans-serif`,
      labelFontFamily: `ui-sans-serif, sans-serif`,
    },
    // fontWeights: {},
    // lineHeights: {},
    // letterSpacings: {},
    // sizes: {},
    borderWidths: {
      buttonBorderWidth: '1px',
      inputBorderWidth: '1px',
    },
    // borderStyles: {},
    radii: {
      borderRadiusButton: '8px',
      buttonBorderRadius: '8px',
      inputBorderRadius: '8px',
    },
    // shadows: {},
    // zIndices: {},
    // transitions: {},
  },
  dark: {
    colors: {
      brandButtonText: 'white',
      defaultButtonBackground: '#2e2e2e',
      defaultButtonBackgroundHover: '#3e3e3e',
      defaultButtonBorder: '#3e3e3e',
      defaultButtonText: 'white',
      dividerBackground: '#2e2e2e',
      inputBackground: '#1e1e1e',
      inputBorder: '#3e3e3e',
      inputBorderHover: 'gray',
      inputBorderFocus: 'gray',
      inputText: 'white',
      inputPlaceholder: 'darkgray',
      messageText: '#85e0b7',
      messageBackground: '#072719',
      messageBorder: '#2b805a',
      messageBackgroundDanger: '#1f1315',
    },
  },
}

export default function Home() {
    const client = createClient()
    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <Image
                        className="mx-auto h-20 w-auto"
                        src={JadeFinanceLogo}
                        alt="Your Company"
                    />
                    <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                    <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                        <Auth
                            supabaseClient={client}
                            appearance={{ 
                                theme: customTheme,
                                className: {
                                    button: "duration-200",
                                }
                            }}
                            providers={[]}
                            // redirectTo={`${getBaseUrl()}/home`}
                            socialLayout='horizontal'
                        />

                    </div>
                </div>
            </div>
        </>
    )
}
