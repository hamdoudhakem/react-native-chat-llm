package com.chatllm

import android.view.View

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.viewmanagers.ChatLlmViewManagerDelegate
import com.facebook.react.viewmanagers.ChatLlmViewManagerInterface

abstract class ChatLlmViewManagerSpec<T : View> : SimpleViewManager<T>(), ChatLlmViewManagerInterface<T> {
  private val mDelegate: ViewManagerDelegate<T>

  init {
    mDelegate = ChatLlmViewManagerDelegate(this)
  }

  override fun getDelegate(): ViewManagerDelegate<T>? {
    return mDelegate
  }
}
