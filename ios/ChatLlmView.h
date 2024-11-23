// This guard prevent this file to be compiled in the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED
#import <React/RCTViewComponentView.h>
#import <UIKit/UIKit.h>

#ifndef ChatLlmViewNativeComponent_h
#define ChatLlmViewNativeComponent_h

NS_ASSUME_NONNULL_BEGIN

@interface ChatLlmView : RCTViewComponentView
@end

NS_ASSUME_NONNULL_END

#endif /* ChatLlmViewNativeComponent_h */
#endif /* RCT_NEW_ARCH_ENABLED */
